import React from 'react'
import {renderFragment} from 'test-utils'
import {Avatar} from './Avatar'

test('<Avatar> -> as prop', () => {
  expect(renderFragment(<Avatar as="div" />)).toMatchSnapshot()
})