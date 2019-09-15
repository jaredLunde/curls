import React from 'react'
import {css} from '@emotion/core'
import {render, renderFragment} from 'test-utils'
import {fireEvent} from '@testing-library/react'
import {TextArea} from './TextArea'

test('<TextArea> -> as prop', () => {
  expect(renderFragment(<TextArea as="span" />)).toMatchSnapshot()
})

test('<TextArea> -> box properties', () => {
  expect(renderFragment(<TextArea d="block" />)).toMatchSnapshot()
})

test('<TextArea> -> flex properties', () => {
  expect(renderFragment(<TextArea row />)).toMatchSnapshot()
})

test('<TextArea> -> text properties', () => {
  expect(renderFragment(<TextArea weight="700" />)).toMatchSnapshot()
})

test('<TextArea> -> placeholder/hover/focus', () => {
  const theme = {
    textArea: {
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

  expect(renderFragment(<TextArea />, theme)).toMatchSnapshot()
})

test('<TextArea> -> autoResize', () => {
  expect(renderFragment(<TextArea autoResize />)).toMatchSnapshot()
})

test('<TextArea> -> onChange', () => {
  const mockChange = jest.fn()
  const rendered = render(
    <TextArea autoResize onChange={mockChange} data-testid="textarea" />
  )
  fireEvent.change(rendered.getByTestId('textarea'), {
    target: {
      value: 'hello',
    },
  })
  expect(mockChange).toHaveBeenCalled()
})
