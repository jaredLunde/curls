import React from 'react'
import {css} from '@emotion/core'
import {renderFragment} from 'test-utils'
import {Input} from './Input'

test('<Input> -> as prop', () => {
  expect(renderFragment(<Input as="span" />)).toMatchSnapshot()
})

test('<Input> -> box properties', () => {
  expect(renderFragment(<Input d="block" />)).toMatchSnapshot()
})

test('<Input> -> flex properties', () => {
  expect(renderFragment(<Input row />)).toMatchSnapshot()
})

test('<Input> -> text properties', () => {
  expect(renderFragment(<Input bold />)).toMatchSnapshot()
})

test('<Input> -> placeholder/hover/focus', () => {
  const theme = {
    input: {
      getPlaceholderClass: () =>
        css`
          color: black;
        `,
      getHoverClass: () =>
        css`
          &:hover {
            background: red;
          }
        `,
      getFocusClass: () =>
        css`
          &:focus {
            background: blue;
          }
        `,
    },
  }

  expect(renderFragment(<Input />, theme)).toMatchSnapshot()
})

test('<Input> -> placeholder is null', () => {
  const theme = {
    input: {
      getPlaceholderClass: () => null,
    },
  }

  expect(renderFragment(<Input />, theme)).toMatchSnapshot()
})
