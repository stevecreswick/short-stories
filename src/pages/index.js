import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import ReadableTime from "../components/readabletime"
import Excerpt from "../components/excerpt"

import "../stylesheets/pages/index.scss"

const IndexPage = props => {
  const authors = props.data.allAuthorsJson.edges.map(({ node }) => node)

  return (
    <Layout>
      <SEO title="Home" />
      <div className="index__container">
        <ul>
          {authors.map(author => (
            <li key={author.path}>
              <Link to={author.path}>{author.display}</Link>

              <ul>
                {author.stories.map(story => (
                  <li key={story.key}>
                    <Link to={`${author.path}${story.path}`}>
                      {story.display}
                    </Link>
                    <ReadableTime timeInMin={story.readtime} />
                    <Excerpt
                      text={story.excerpt}
                      link={`${author.path}${story.path}`}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
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
            excerpt
          }
        }
      }
    }
  }
`
