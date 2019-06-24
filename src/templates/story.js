import React from "react"
import Layout from "../components/layout"
import ReadableTime from "../components/readabletime"
import { graphql } from "gatsby"

function StoryTemplate(props) {
  const { pageContext, data } = props
  const { allAuthorsJson } = data
  const { storyKey } = pageContext

  const author = allAuthorsJson.edges[0].node
  const story = author.stories.filter(story => story.key === storyKey)[0]

  const { display, year, readtime, source, paragraphs } = story

  return (
    <Layout>
      <h1>{display}</h1>
      <div>
        <ul>
          <li>
            <a href={author.path}>
              <span>{author.display}</span>
            </a>
          </li>
          <li>
            <span>{year}</span>
          </li>
          <li>
            <ReadableTime timeInMin={readtime} />
          </li>
        </ul>
      </div>
      {paragraphs.map((paragraph, i) => {
        return <p key={`paragraph-${i}`}>{paragraph}</p>
      })}
      <div>{source}</div>
    </Layout>
  )
}

export default StoryTemplate

export const query = graphql`
  query($storyKey: String!) {
    allAuthorsJson(
      filter: { stories: { elemMatch: { key: { eq: $storyKey } } } }
    ) {
      edges {
        node {
          key
          display
          path
          stories {
            key
            display
            path
            year
            readtime
            source
            wordcount
            paragraphs
          }
        }
      }
    }
  }
`

// {
//   allAuthorsJson(filter: { stories: { elemMatch: { key: { eq: "telltaleheart" } } } }) {
//     edges
//   }
// }
