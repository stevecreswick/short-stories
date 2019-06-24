import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import ReadableTime from "../components/readabletime"

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
                <li key={story.key}>
                  <a href={`${author.path}${story.path}`}>{story.display}</a>
                  <ReadableTime timeInMin={story.readtime} />
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
            key
            display
            path
            readtime
          }
        }
      }
    }
  }
`
