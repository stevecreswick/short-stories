import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import ReadableTime from "../components/readabletime"

function AuthorTemplate(props) {
  const { display, path, stories } = props.data.authorsJson

  console.log("Stories ", stories)

  return (
    <Layout>
      <h1>
        <a href={path}>{display}</a>
      </h1>
      <ul>
        {stories.map(story => (
          <li key={story.key}>
            <a href={`${path}${story.path}`}>{story.display}</a>
            <ReadableTime timeInMin={story.readtime} />
          </li>
        ))}
      </ul>
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
      }
    }
  }
`
