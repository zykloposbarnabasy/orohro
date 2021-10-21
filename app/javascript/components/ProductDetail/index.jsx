import React, {useEffect} from 'react'
import {PropTypes} from 'prop-types'

import create from 'zustand'

import styles from './ProductDetail.module.scss'

const useStore = create((set, get) => ({
  title: undefined,
  averageScore: undefined,
  reviews: [],
  fetchProduct: async (slug) => {
    const res = await fetch(`/api/products/${slug}`, {
      headers: {
        Accept: 'application/json',
      },
    })
    const p = await res.json()
    set({
      title: p.title,
      averageScore: Number(p.average_score),
      reviews: p.reviews,
    })
  },
}))

const selectors = {
  fetchProduct: (state) => state.fetchProduct,
  title: (state) => state.title,
  averageScore: (state) => state.averageScore,
  reviews: (state) => state.reviews,
}

function ProductDetail({slug}) {
  const fetchProduct = useStore(selectors.fetchProduct)
  const title = useStore(selectors.title)
  const averageScore = useStore(selectors.averageScore)
  const reviews = useStore(selectors.reviews)

  useEffect(() => {
    fetchProduct(slug)
  }, [])

  return (
    <>
      <h1>{title}</h1>

      <div className={styles.topContent}>
        <div className={styles.averageRating}>
          <span>{!!averageScore ? averageScore.toFixed(1) : '–.–'}</span>
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
        {reviews.map(({id, score, text}) => (
          <div className={styles.reviewRow} key={id}>
            <div
              className={styles.stars}
              role="star-rating"
              data-rating-max="5"
              data-rating-readonly></div>
            <span>
              <b>{score}</b>
              {!!text && `, ${text}`}
            </span>
          </div>
        ))}
        {!reviews.length && <span>None yet.</span>}
      </div>
    </>
  )
}

ProductDetail.propTypes = {
  slug: PropTypes.string.isRequired,
}

export default ProductDetail
