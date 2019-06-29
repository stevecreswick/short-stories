const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")
const path = require("path")
const striptags = require("striptags")
const decode = require("unescape")

require("dotenv").config()

const BASE_URL = process.env.BASE_URL

const url = author => `${BASE_URL}/author/${author}`

const writeFile = (author, fileName, file) => {
  const authorDir = path.join("scraped", author)

  if (!fs.existsSync(authorDir)) {
    fs.mkdirSync(authorDir)
  }

  const loc = path.join(authorDir, fileName)

  fs.writeFile(loc, striptags(file), (err, data) => {
    console.log(err)
    console.log(data)
  })
}

const scrape = authorPath => {
  const paths = []
  return new Promise((resolve, reject) => {
    axios
      .get(url(authorPath))
      .then(function(response) {
        const $ = cheerio.load(response.data)

        $("a").map((i, elem) => {
          const href = $(elem).attr("href")

          if (href) {
            const split = href.split("/")

            if (split && split.length) {
              const isAuthorAndShortStory =
                split.indexOf("short-story") !== -1 &&
                split.indexOf(authorPath) !== -1

              if (isAuthorAndShortStory) {
                paths.push({ path: href, author: authorPath })
              }
            }
          }

          resolve(paths)
        })
      })
      .catch(err => {
        console.log("Ruh roh")

        console.log(err)

        reject(err)
      })
  })
}

const getStory = story => {
  const { path, author } = story
  const url = `${BASE_URL}${path}`

  const splitPath = path.split("/")
  const storyPath = splitPath[splitPath.length - 1]

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(function(response) {
        const $ = cheerio.load(response.data)

        // console.log($("itemscope"))
        let start = false
        let end = false

        const elements = $(".jumbotron")
          .children()
          .filter((i, child) => {
            const tag = $(child)[0].tagName

            if (end) {
              return false
            }

            if (!start && tag === "div") {
              start = true
              return false
            }

            if (start && tag === "hr" && !end) {
              end = true
              return false
            }

            return true
          })

        let storyStart = false
        let firstParagraph = false
        let lastParagraph = false
        const html = elements
          .map((i, elem) => {
            let html = $(elem).html()
            html = decode(html)

            // Replace dashes
            html = html.replace(/\u2013|\u2014|\&\#x2014;/gi, "--")

            return { tag: elem.name, html }
          })
          .toArray()
          .reduce((accumulator, currentValue) => {
            const { tag, html } = currentValue
            if (tag === "hr") {
              storyStart = true

              return accumulator
            }

            // After we have seen an hr, but have not seen a p tag yet
            if (storyStart && tag === "p" && !firstParagraph) {
              firstParagraph = true
              return [...accumulator, html]
            }

            if (storyStart && firstParagraph && !lastParagraph) {
              return [...accumulator, html]
            }

            if (firstParagraph && !lastParagraph && tag === "hr") {
              lastParagraph = true
              return accumulator
            }

            return accumulator
          }, [])

        const folder = author.replace(/-/gi, "")
        const filename = storyPath.replace(/-/gi, "")

        writeFile(folder, `${filename}.txt`, html.join("\n\n"))

        resolve()
      })
      .catch(err => {
        console.log("Ruh roh")
        console.log(err)

        reject(err)
      })
  })
}

const run = () => {
  scrape("philip-k-dick").then(paths => {
    paths.forEach(path => {
      getStory(path)
    })
  })
}

run()
