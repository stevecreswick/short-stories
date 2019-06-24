const yaml = require("js-yaml")
const fs = require("fs")
const path = require("path")

const calculateWordCount = paragraphs => {
  return paragraphs
    .map(paragraph => {
      if (paragraph === "") {
        return 0
      }

      return paragraph.split(" ").length
    })
    .reduce((total, num) => total + num)
}

const calculateReadTime = wordcount => {
  const WORDS_PER_MINUTE = 265
  const readtime = +`${Math.round(`${wordcount / WORDS_PER_MINUTE}e+2`)}e-2`

  return readtime
}

const calculateParagraphs = text => {
  const split = text.split("\n")

  const paragraphs = []
  let temp = ""

  split.forEach((block, i) => {
    // There is no line break after the last line,
    // this ensures the last paragraphs gets added
    if (i === split.length - 1) {
      temp = `${temp} ${block}`
      paragraphs.push(temp)
    }

    if (block !== "") {
      temp = `${temp} ${block}`
    } else {
      paragraphs.push(temp)
      temp = ""
    }
  })

  const excerpt = text.substring(0, 500)

  return { paragraphs, excerpt }
}

// author/story will be the yaml keys
// e.g. edgarallanpoe/telltaleheart
const formatStory = (authorKey, storyKey) => {
  const text = fs.readFileSync(`library/${authorKey}/${storyKey}.txt`, "utf8")

  const { paragraphs, excerpt } = calculateParagraphs(text)
  const wordcount = calculateWordCount(paragraphs)
  const readtime = calculateReadTime(wordcount)

  return { wordcount, readtime, paragraphs, excerpt }
}
const addStoryText = authors => {
  return authors.map(author => {
    const { key: authorKey, display, path } = author

    const stories = author.stories.map(story => {
      const { key: storyKey, display, year, path, source } = story
      const { wordcount, readtime, paragraphs, excerpt } = formatStory(
        authorKey,
        storyKey
      )

      return {
        key: storyKey,
        display,
        path,
        year,
        wordcount,
        readtime,
        source,
        paragraphs,
        excerpt,
      }
    })

    return {
      key: authorKey,
      display,
      path,
      stories,
    }
  })
}

const writeJSON = async authors => {
  const json = JSON.stringify(authors)
  const location = path.join(process.cwd(), "src", "data", "authors.json")

  fs.writeFile(location, json, (err, data) => {
    if (err) {
      throw err
    }

    console.info("*** Success ***")
    console.info("Authors JSON written")
  })
}

try {
  const library = yaml.safeLoad(fs.readFileSync("library.yml", "utf8"))

  // The YAML does not contain the full story text
  const authors = addStoryText(library.authors)

  writeJSON(authors)
} catch (e) {
  console.log(e)
}
