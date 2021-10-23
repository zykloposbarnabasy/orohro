import React, {useCallback, useEffect, useRef, useState} from 'react'
import {PropTypes} from 'prop-types'

import {createConsumer} from '@rails/actioncable'
import create from 'zustand'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import StarRating from 'components/StarRating'

import classNames from 'classnames'
import closeIcon from './close.svg'
import styles from './ProductDetail.module.scss'

const useStore = create((set, get) => ({
  title: undefined,
  averageScore: undefined,
  reviews: [],
  updateProduct: (p) => {
    set({
      title: p.title,
      averageScore: Number(p.average_score),
      reviews: p.reviews,
    })
  },
  fetchProduct: async (slug) => {
    const res = await fetch(`/api/products/${slug}`, {
      headers: {
        Accept: 'application/json',
      },
    })
    const p = await res.json()
    get().updateProduct(p)
  },
}))

const selectors = {
  title: (state) => state.title,
  averageScore: (state) => state.averageScore,
  reviews: (state) => state.reviews,
  updateProduct: (state) => state.updateProduct,
  fetchProduct: (state) => state.fetchProduct,
}

const popupContentStyle = {
  position: 'relative',
  marginTop: 'auto',
  marginBottom: 'auto',
  borderRadius: '4px',
  background: '#fff',
  padding: '3rem',
}

function ProductDetail({productId, slug, formAuthenticityToken}) {
  const fetchProduct = useStore(selectors.fetchProduct)
  const title = useStore(selectors.title)
  const averageScore = useStore(selectors.averageScore)
  const reviews = useStore(selectors.reviews)
  const updateProduct = useStore(selectors.updateProduct)

  const [reviewScore, setReviewScore] = useState()
  const [scoreError, setScoreError] = useState(false)

  const refPopup = useRef()
  const refReviewTextarea = useRef()

  useEffect(() => {
    fetchProduct(slug)

    createConsumer().subscriptions.create(
      {channel: 'ProductsChannel', product_id: productId},
      {
        received: (product) => {
          updateProduct(product)
        },
      }
    )
  }, [])

  const changeScore = useCallback(
    (score) => {
      setReviewScore(score)
      setScoreError(false)
    },
    [setReviewScore, setScoreError]
  )

  const ratingModalOpen = useCallback(() => {
    refReviewTextarea.current.focus()
  }, [refReviewTextarea])

  const ratingModalClose = useCallback(() => {
    changeScore(undefined)
  }, [changeScore])

  const submitReview = useCallback(
    async (e) => {
      e.preventDefault()

      if (reviewScore === undefined) {
        setScoreError(true)
        return
      }

      const body = new URLSearchParams(new FormData(e.target))

      const res = await fetch('/products/submitReview', {
        method: 'POST',
        body,
      })

      refPopup.current.close()
    },
    [refPopup, reviewScore, setScoreError]
  )

  const closeModal = useCallback(() => {
    refPopup.current.close()
  }, [refPopup])

  return (
    <>
      <h1>{title}</h1>
      <div className={styles.topContent}>
        <div className={styles.averageRating}>
          <span>{!!averageScore ? averageScore.toFixed(1) : '–.–'}</span>
          <StarRating score={Math.round(averageScore || 0)} readonly />
        </div>
        <Popup
          ref={refPopup}
          trigger={<button>Add review</button>}
          modal
          contentStyle={popupContentStyle}
          onOpen={ratingModalOpen}
          onClose={ratingModalClose}>
          <div className={styles.ratingModal}>
            <div className={styles.modalHeader}>
              <button onClick={closeModal}>
                <img src={closeIcon} />
              </button>
            </div>
            <h1>What's your rating?</h1>
            <form onSubmit={submitReview}>
              <input name="authenticity_token" value={formAuthenticityToken} type="hidden" />
              <input name="slug" value={slug} type="hidden" />
              {!!reviewScore && <input name="score" value={reviewScore} type="hidden" />}
              <h5>Rating</h5>
              <StarRating score={reviewScore} className={styles.stars} callback={changeScore} />
              <p className={classNames(styles.formError, {[styles.hidden]: !scoreError})}>
                Please enter a score
              </p>
              <h5>Review</h5>
              <textarea
                name="text"
                ref={refReviewTextarea}
                placeholder="Start typing..."></textarea>
              <button type="submit">Submit review</button>
            </form>
          </div>
        </Popup>
      </div>

      <hr />

      <h2>Reviews</h2>

      <div className={styles.reviews}>
        {reviews.map(({id, score, text}) => (
          <div className={styles.reviewRow} key={id}>
            <StarRating score={score} readonly />
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
  productId: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  formAuthenticityToken: PropTypes.string.isRequired,
}

export default ProductDetail
