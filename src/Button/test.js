import React from 'react'
import {css} from '@emotion/core'
import {renderFragment} from 'test-utils'
import {Button} from '../Button'

test('<Button> -> as prop', () => {
  expect(renderFragment(<Button as="div" />)).toMatchSnapshot()
})

test('<Button> -> box properties', () => {
  expect(renderFragment(<Button d="block" />)).toMatchSnapshot()
})

test('<Button> -> flex properties', () => {
  expect(renderFragment(<Button row />)).toMatchSnapshot()
})

test('<Button> -> default scale', () => {
  const sizes = ['sm', 'md', 'lg']
  for (let size of sizes)
    expect(renderFragment(<Button size={size} />)).toMatchSnapshot(size)
})

test('<Button> -> themed scale', () => {
  let theme = {
    button: {
      scale: {
        sm: css`
          padding: 1rem;
        `,
        md: css`
          padding: 2rem;
        `,
        lg: css`
          padding: 3rem;
        `,
      },
    },
  }

  const sizes = ['sm', 'md', 'lg']
  for (let size of sizes)
    expect(renderFragment(<Button size={size} />, theme)).toMatchSnapshot(
      `css.${size}`
    )

  theme = {
    button: {
      scale: {
        sm: () =>
          css`
            padding: 1rem;
          `,
        md: () =>
          css`
            padding: 2rem;
          `,
        lg: () =>
          css`
            padding: 3rem;
          `,
      },
    },
  }

  for (let size of sizes)
    expect(renderFragment(<Button size={size} />, theme)).toMatchSnapshot(
      `fn.${size}`
    )
})

test('<Button> -> active/hover class', () => {
  const theme = {
    button: {
      getHoverClass: () =>
        css`
          &:hover {
            transform: scale(2);
          }
        `,
      getActiveClass: () =>
        css`
          &:active {
            transform: scale(1);
          }
        `,
    },
  }

  expect(renderFragment(<Button />, theme)).toMatchSnapshot('2@hover, 1@active')
})
