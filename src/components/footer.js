import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./footer.scss"

const Footer = ({ siteTitle }) => (
  <footer>
    <div class="footer__container">
      <h3>
        <Link to="/">{siteTitle}</Link>
      </h3>
    </div>
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
