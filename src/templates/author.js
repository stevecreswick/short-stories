import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import ReadableTime from "../components/readabletime"
import Excerpt from "../components/excerpt"
import { Link } from "gatsby"

import "../stylesheets/templates/author.scss"

function AuthorTemplate(props) {
  console.log(props)

  const { display, path, stories } = props.data.authorsJson

  return (
    <Layout>
      <div className="author__container">
        <h1>{display}</h1>
        <ul>
          {stories.map(story => (
            <li key={story.key}>
              <Link to={`${path}${story.path}`}>{story.display}</Link>
              <ReadableTime timeInMin={story.readtime} />
              <Excerpt text={story.excerpt} link={`${path}${story.path}`} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
export default AuthorTemplate

export const query = graphql`
  query($slug: String!) {
    authorsJson(path: { eq: $slug }) {
      display
      path
      stories {
        key
        display
        path
        readtime
        wordcount
        excerpt
      }
    }
  }
`
