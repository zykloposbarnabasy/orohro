import React, {useCallback, useState} from 'react'
import {PropTypes} from 'prop-types'

import classNames from 'classnames'
import styles from './StarRating.module.scss'

const STAR_VALUE = {
  EMPTY: 'star-empty',
  HALF: 'star-half',
  FULL: 'star-full',
}

function Star({index, valueClass, setScore, setHoverScore}) {
  const ZERO_AREA_PADDING_PX = 10

  const getEventScore = useCallback(
    (e) => {
      let x = e.nativeEvent.offsetX
      let width = e.currentTarget.clientWidth

      if (index === 0) {
        if (x < ZERO_AREA_PADDING_PX) {
          return 0
        }
        x -= ZERO_AREA_PADDING_PX
        width -= ZERO_AREA_PADDING_PX
      }

      return index + (x >= width / 2 ? 1 : 0.5)
    },
    [index]
  )

  const starMouseMove = useCallback(
    (e) => {
      setHoverScore(getEventScore(e))
    },
    [getEventScore, setHoverScore]
  )
  const starMouseOut = useCallback(
    (e) => {
      setHoverScore(undefined)
    },
    [setHoverScore]
  )
  const starClick = useCallback(
    (e) => {
      setScore(getEventScore(e))
    },
    [getEventScore, setScore]
  )

  const handlerProps = !!setHoverScore
    ? {
        onMouseMove: starMouseMove,
        onMouseOut: starMouseOut,
        onClick: starClick,
      }
    : {}

  const styleInline = `
    .star-full path { fill: #efce4a; }
    .star-half .star__left { fill: #efce4a; }
    .star-half .star__right { fill: #bfbfbf; }
    .star-empty path { fill: #bfbfbf; }
  `

  return (
    <svg
      {...handlerProps}
      className={classNames(styles.ratingStar, valueClass)}
      style={index === 0 ? {paddingLeft: `${ZERO_AREA_PADDING_PX}px`} : undefined}
      enableBackground="new 0 0 53.867 53.867"
      version="1.1"
      viewBox="0 0 53.867 53.867"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style type="text/css">{styleInline}</style>
      </defs>
      <path
        className="star__left"
        d="m26.902 1.3809-8.291 16.801-18.611 2.7051 13.467 13.127-3.1797 18.535 16.615-8.7344z"
      />
      <path
        className="star__right"
        d="m26.902 1.3809v42.434l0.03125-0.01563 16.645 8.75-3.1777-18.535 13.467-13.127-18.611-2.7051-8.3223-16.863z"
      />
    </svg>
  )
}

Star.propTypes = {
  index: PropTypes.number.isRequired,
  valueClass: PropTypes.oneOf(Object.values(STAR_VALUE)).isRequired,
  setScore: PropTypes.func,
  setHoverScore: PropTypes.func,
}

Star.defaultProps = {
  setScore: undefined,
  setHoverScore: undefined,
}

function StarRating({score, maxScore, readonly, callback, className}) {
  const [hoverScore, setHoverScore] = useState()

  const displayScore = !readonly && hoverScore !== undefined ? hoverScore : score
  const fullStars = Math.max(Math.trunc(Math.min(displayScore, maxScore)), 0)
  const hasHalfStar = !!(displayScore % 1) && displayScore < maxScore

  const callbackProps = readonly ? {} : {setScore: callback, setHoverScore}
  const stars = Array(maxScore)

  let i
  for (i = 0; i < fullStars; i++) {
    stars[i] = <Star index={i} valueClass={STAR_VALUE.FULL} {...callbackProps} />
  }
  if (hasHalfStar) {
    stars[i] = <Star index={i} valueClass={STAR_VALUE.HALF} {...callbackProps} />
    i++
  }
  for (; i < maxScore; i++) {
    stars[i] = <Star index={i} valueClass={STAR_VALUE.EMPTY} {...callbackProps} />
  }

  return (
    <div className={classNames(styles.starContainer, className)}>
      {stars.map((star, i) => (
        <React.Fragment key={i}>{star}</React.Fragment>
      ))}
    </div>
  )
}

StarRating.propTypes = {
  score: PropTypes.number,
  maxScore: PropTypes.number,
  readonly: PropTypes.bool,
  callback: PropTypes.func,
  className: PropTypes.string,
}

StarRating.defaultProps = {
  score: 0,
  maxScore: 5,
  readonly: false,
  callback: undefined,
  className: undefined,
}

export default StarRating
