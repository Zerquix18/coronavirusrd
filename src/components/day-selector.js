import React from "react"
import PropTypes from "prop-types"

// Styles
import "../styles/day-selector.css"

/**
 * Component used to choose the data to filter the data by
 * @param name            : unique name for the radio selector
 * @param dayValue        : current value
 * @param setValue        : radio selector handler
 * @returns {*}
 * @constructor
 */
const DaySelector = ({ name, dayValue, setValue }) => {
  return (
    <div className="control day-selector">
      <label className="radio">
        <input type="radio" name={name} checked={dayValue} onClick={() => setValue(true)} />
        <span className="">Hoy</span>
      </label>
      <label className="radio">
        <input type="radio" name={name} checked={!dayValue} onClick={() => setValue(false)} />
        <span className="">Ayer</span>
      </label>
    </div>
  )
}

DaySelector.propTypes = {
  name: PropTypes.string,
  dayValue: PropTypes.bool,
  setValue: PropTypes.func,
}

DaySelector.defaultProps = {
  name: 'day',
  dayValue: true,
  setValue: () => {},
}

export default DaySelector
