import React, {useState} from 'react'
import {PropTypes} from 'prop-types'

import styles from './StarRating.module.scss'

function StarRating({score, maxScore, readonly, callback}) {
  const [hoverScore, setHoverScore] = useState()

  return <h1 className={styles.bauernsau}>bauern sau bauern sau heut hau ich dich gruen und blau</h1>
}

StarRating.propTypes = {
  score: PropTypes.number,
  maxScore: PropTypes.number,
  readonly: PropTypes.boolean,
  callback: PropTypes.function,
}

StarRating.defaultProps = {
  score: 0,
  maxScore: 5,
  readonly: true,
  callback: undefined,
}

export default StarRating
