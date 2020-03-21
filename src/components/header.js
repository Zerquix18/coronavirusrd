import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <section className="hero is-primary">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">
          { siteTitle }
        </h1>
      </div>
    </div>
  </section>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
