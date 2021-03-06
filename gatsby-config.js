const yaml = require("js-yaml")
const fs = require("fs")
// const path = require("path")

const library = yaml.safeLoad(fs.readFileSync("library/library.yml", "utf8"))

let storyCount = 0
const authorLinks = library.authors.map(author => {
  const { path, display, stories } = author
  storyCount += stories.length
  return { path, display }
})

module.exports = {
  siteMetadata: {
    title: `Salute Your Shorts`,
    description: `Public domain short stories for the modern web.`,
    author: `@stevecreswick`,
    menuLinks: [
      {
        display: "Authors",
        path: "/authors",
        subLinks: authorLinks,
      },
    ],
    storyCount,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
