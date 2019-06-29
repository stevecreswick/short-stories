import PropTypes from "prop-types"
import React from "react"

const ReadableTime = ({ timeInMin }) => {
  const time = timeInMin * 60
  const minutes = Math.floor(time / 60)
  const seconds = Math.round(time - minutes * 60)

  return timeInMin ? <span>{`Read Time: ${minutes}m ${seconds}s`}</span> : ""
}

ReadableTime.propTypes = {
  timeInMin: PropTypes.number,
}

ReadableTime.defaultProps = {
  timeInMin: 0,
}

export default ReadableTime
