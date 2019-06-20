import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

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
          <li key={story.path}>
            <a href={story.path}>
              {story.display}
              <span>{story.wordcount}</span>
            </a>
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
        display
        path
        wordcount
      }
    }
  }
`
