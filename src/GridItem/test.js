import React from 'react'
import {renderFragment} from 'test-utils'
import {GridItem} from './GridItem'

test('<GridItem> -> as prop', () => {
  expect(renderFragment(<GridItem as="span" />)).toMatchSnapshot()
})

test('<GridItem> -> has box properties', () => {
  expect(renderFragment(<GridItem m="b1" />)).toMatchSnapshot()
})

test('<GridItem> -> has flex properties', () => {
  expect(renderFragment(<GridItem flex />)).toMatchSnapshot()
})

test('<GridItem> -> row', () => {
  expect(renderFragment(<GridItem row="1" />)).toMatchSnapshot()
})

test('<GridItem> -> col', () => {
  expect(renderFragment(<GridItem col="1" />)).toMatchSnapshot()
})

test('<GridItem> -> area', () => {
  expect(renderFragment(<GridItem area="sidebar" />)).toMatchSnapshot()
})
