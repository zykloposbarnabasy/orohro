import React, {useState} from 'react'
import {PropTypes} from 'prop-types'

import styles from './ProductDetail.module.scss'

function ProductDetail({slug}) {
  const title = undefined

  return (
    <>
      <h1>{title || 'weis nit'}</h1>

      <div className={styles.topContent}>
        <div className={styles.averageRating}>
          <span>–.–</span>
          <div
            className={styles.stars}
            role="star-rating"
            data-rating-max="5"
            data-rating-readonly></div>
        </div>
        <button id="btn-add-review">Add review</button>
      </div>

      <hr />

      <h2>Reviews</h2>

      <div className={styles.reviews}>
        {/* for each review */}
        <div className={styles.reviewRow}>
          <div
            className={styles.stars}
            role="star-rating"
            data-rating-max="5"
            data-rating-readonly></div>
          <span>
            {/* <b><%= review.score %></b><% if review.text -%>, <%= review.text %><% end %> */}
            <b>–</b>, bin ich fro heiss ich f&uuml;dle kn&ouml;chel
          </span>
        </div>
        {/* endfor */}
        {/* if !reviews */}
        <span>None yet.</span>
        {/* endif */}
      </div>
    </>
  )
}

ProductDetail.propTypes = {
  slug: PropTypes.string.isRequired,
}

export default ProductDetail
