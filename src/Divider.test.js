import React from 'react'
import {renderFragment} from 'test-utils'
import {Divider} from './Divider'

test('<Divider> -> as prop', () => {
  expect(renderFragment(<Divider as="span" />)).toMatchSnapshot()
})

test('<Divider> -> box props', () => {
  expect(renderFragment(<Divider m="b2" />)).toMatchSnapshot()
})
