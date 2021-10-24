import React from 'react'

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import { shallow, configure } from 'enzyme'

import StarRating from 'components/StarRating'
import styles from 'components/StarRating/StarRating.module.scss'

test('1 + 1 equals 2', () => {
  expect(1 + 1).toBe(2);
})

test('React component', () => {
  const wrapper = shallow(<StarRating />)
  expect(wrapper.find(`.${styles.starContainer}`)).toHaveLength(1)
})
