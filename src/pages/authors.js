import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import ReadableTime from "../components/readabletime"
import Excerpt from "../components/excerpt"

import "../stylesheets/pages/authors.scss"

const AuthorsPage = props => {
  const authors = props.data.allAuthorsJson.edges.map(({ node }) => node)

  console.log(authors)

  return (
    <Layout>
      <SEO title="Short Story Authors" />

      <ul>
        {authors.map(author => (
          <li key={author.key}>
            <Link to={author.path}>{author.display}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default AuthorsPage

export const query = graphql`
  query {
    allAuthorsJson {
      edges {
        node {
          key
          display
          path
        }
      }
    }
  }
`
