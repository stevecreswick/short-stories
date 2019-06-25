import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../stylesheets/components/excerpt.scss"

const Excerpt = ({ text, link }) => {
  return (
    <Link to={link}>
      <p className="excerpt">{`${text}...`}</p>
    </Link>
  )
}

Excerpt.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
}

Excerpt.defaultProps = {
  text: ``,
}

export default Excerpt
