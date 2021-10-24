import React from 'react'

import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
configure({adapter: new Adapter()})

import {configure, mount, shallow} from 'enzyme'

import ProductDetail from 'components/ProductDetail'
import ProductDetail__styles from 'components/ProductDetail/ProductDetail.module.scss'

import StarRating, {STAR_VALUE} from 'components/StarRating'
import StarRating__styles from 'components/StarRating/StarRating.module.scss'

import {act} from 'react-dom/test-utils'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        title: 'The Sample Product',
        average_score: '3.412',
        reviews: [],
      }),
  })
)

describe('StarRating', () => {
  it('renders the correct number of empty/full stars given a score', () => {
    for (let score = 0; score < 5; score++) {
      const wrapper = shallow(<StarRating score={score} />)
      expect(wrapper.find({valueClass: STAR_VALUE.FULL})).toHaveLength(score)
      expect(wrapper.find({valueClass: STAR_VALUE.EMPTY})).toHaveLength(5 - score)
    }
  })
})

describe('ProductDetail', () => {
  let wrapper

  beforeEach(async () => {
    await act(async () => {
      wrapper = mount(
        <ProductDetail productId={1} slug="sample-product" formAuthenticityToken="" />
      )
    })
  })

  it('shows average score with one decimal place', () => {
    expect(wrapper.find(`.${ProductDetail__styles.averageRating} span`).text()).toEqual('3.4')
  })

  it('shows the correct number of empty/full stars for the average score', () => {
    expect(
      wrapper.find(`.${ProductDetail__styles.averageRating}`).find({valueClass: STAR_VALUE.FULL})
    ).toHaveLength(3)
  })
})
