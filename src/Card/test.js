import React from 'react'
import {renderFragment} from 'test-utils'
import {Card} from './Card'

test('<Card> -> as prop', () => {
  expect(renderFragment(<Card as="span" />)).toMatchSnapshot()
})

test('<Card> -> box props', () => {
  expect(renderFragment(<Card m='b3'/>)).toMatchSnapshot()
})

test('<Card> -> flex props', () => {
  expect(renderFragment(<Card row/>)).toMatchSnapshot()
})

test('<Card> -> br', () => {
  const directions = [
    't',
    'b',
    'tl',
    'tr',
    'bl',
    'br',
    'l',
    'r',
  ]

  for (let d of directions)
    expect(renderFragment(<Card br={`${d}1`}/>)).toMatchSnapshot(`${d}1`)

  expect(renderFragment(<Card br={`t1 b2`}/>)).toMatchSnapshot(`t1 b2`)
  expect(renderFragment(<Card br={`l1 r2`}/>)).toMatchSnapshot(`l1 r2`)
})