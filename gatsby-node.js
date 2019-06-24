/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// // Query for the home page:
// {
//   allAuthorsJson {
//     edges {
//       node {
//         name
//         stories {
//           title
//           path
//           wordcount
//         }
//       }
//     }
//   }
// }

const path = require("path")
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`)
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allAuthorsJson {
            edges {
              node {
                key
                display
                path
                stories {
                  key
                  display
                  path
                  wordcount
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors)
          return reject(result.errors)
        }
        const blogTemplate = path.resolve("./src/templates/blog-post.js")
        const AuthorTemplate = path.resolve("./src/templates/author.js")
        const StoryTemplate = path.resolve("./src/templates/story.js")

        result.data.allAuthorsJson.edges.forEach(({ node: author }, i) => {
          createPage({
            path: author.path,
            component: AuthorTemplate,
            context: {
              slug: author.path,
            }, // additional data can be passed via context
          })

          author.stories.forEach(story => {
            createPage({
              path: `${author.path}${story.path}`,
              component: StoryTemplate,
              context: {
                storyKey: story.key,
              }, // additional data can be passed via context
            })
          })
        })
        return
      })
    )
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
