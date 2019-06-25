import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "../stylesheets/components/header.scss"

const Header = ({ siteTitle, menuLinks }) => {
  const alias = "header__"

  return (
    <header>
      <div className={`${alias}container`}>
        <h3 style={{ margin: 0 }} className={`${alias}header`}>
          <Link to="/">{siteTitle}</Link>
        </h3>
        <ul className={`${alias}menu`}>
          {menuLinks.map(menuLink => {
            const { display, path, subLinks = [] } = menuLink
            return (
              <li key={path} className={`${alias}menu-item`}>
                <a href={path}>{display}</a>
                <ul className={`${alias}sub-menu`}>
                  {subLinks.map(subLink => {
                    const { path, display } = subLink
                    return (
                      <li key={path} className={`${alias}sub-menu-item`}>
                        <Link to={path}>{display}</Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
