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
              <h3>
                <Link to={author.path}>{author.display}</Link>
              </h3>

              <ul>
                {author.stories.map(story => (
                  <li key={story.key}>
                    <h4>
                      <Link to={`${author.path}${story.path}`}>
                        {story.display}
                      </Link>
                    </h4>

                    <Excerpt
                      text={story.excerpt}
                      link={`${author.path}${story.path}`}
                    />
                    <ReadableTime timeInMin={story.readtime} />
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
