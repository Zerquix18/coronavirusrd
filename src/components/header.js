import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
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
