import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = props => {
  const authors = props.data.allAuthorsJson.edges.map(({ node }) => node)

  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        {authors.map(author => (
          <li key={author.path}>
            <a href={author.path}>{author.display}</a>

            <ul>
              {author.stories.map(story => (
                <li key={story.path}>
                  <a href={story.path}>
                    {story.display}
                    <span>{story.wordcount}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allAuthorsJson {
      edges {
        node {
          display
          path
          stories {
            display
            path
            wordcount
          }
        }
      }
    }
  }
`
