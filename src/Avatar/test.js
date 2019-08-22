import React from 'react'
import {css} from '@emotion/core'
import {renderFragment} from 'test-utils'
import {Avatar} from './Avatar'

test('<Avatar> -> as prop', () => {
  expect(renderFragment(<Avatar as="div" />)).toMatchSnapshot()
})

test('<Avatar> -> box props', () => {
  expect(renderFragment(<Avatar m="b3" />)).toMatchSnapshot()
})

test('<Avatar> -> explicit orientation', () => {
  expect(renderFragment(<Avatar orientation="square" />)).toMatchSnapshot(
    '100% 100%'
  )
  expect(renderFragment(<Avatar orientation="portrait" />)).toMatchSnapshot(
    '100% auto'
  )
  expect(renderFragment(<Avatar orientation="landscape" />)).toMatchSnapshot(
    'auto 100%'
  )
})

test('<Avatar> -> size', () => {
  expect(renderFragment(<Avatar size="sm" />)).toMatchSnapshot('3')
  expect(renderFragment(<Avatar size="md" />)).toMatchSnapshot('6')
  expect(renderFragment(<Avatar size="lg" />)).toMatchSnapshot('12')
  expect(renderFragment(<Avatar size={false} />)).toMatchSnapshot('null')
})

test('<Avatar> -> size [themed]', () => {
  let theme = {
    avatar: {
      sizeUnit: 'px',
      scale: {
        sm: '32',
        md: '64',
        lg: '128',
      },
    },
  }
  expect(renderFragment(<Avatar size="sm" />, theme)).toMatchSnapshot(
    'int.32px'
  )
  expect(renderFragment(<Avatar size="md" />, theme)).toMatchSnapshot(
    'int.64px'
  )
  expect(renderFragment(<Avatar size="lg" />, theme)).toMatchSnapshot(
    'int.128px'
  )

  theme = {
    avatar: {
      sizeUnit: 'px',
      scale: {
        sm: css`
          width: 32px;
          height: 32px;
        `,
        md: css`
          width: 64px;
          height: 64px;
        `,
        lg: css`
          width: 128px;
          height: 128px;
        `,
      },
    },
  }

  expect(renderFragment(<Avatar size="sm" />, theme)).toMatchSnapshot(
    'css.32px'
  )
  expect(renderFragment(<Avatar size="md" />, theme)).toMatchSnapshot(
    'css.64px'
  )
  expect(renderFragment(<Avatar size="lg" />, theme)).toMatchSnapshot(
    'css.128px'
  )

  theme = {
    avatar: {
      sizeUnit: 'px',
      scale: {
        sm: () =>
          css`
            width: 32px;
            height: 32px;
          `,
        md: () =>
          css`
            width: 64px;
            height: 64px;
          `,
        lg: () =>
          css`
            width: 128px;
            height: 128px;
          `,
      },
    },
  }

  expect(renderFragment(<Avatar size="sm" />, theme)).toMatchSnapshot('fn.32px')
  expect(renderFragment(<Avatar size="md" />, theme)).toMatchSnapshot('fn.64px')
  expect(renderFragment(<Avatar size="lg" />, theme)).toMatchSnapshot(
    'fn.128px'
  )
})

test('<Avatar> -> src', () => {
  expect(renderFragment(<Avatar size="sm" src="foo.jpg" />)).toMatchSnapshot(
    'foo.jpg'
  )
})

test('<Avatar> -> defaultSrc', () => {
  expect(
    renderFragment(<Avatar size="sm" defaultSrc="foo.jpg" />)
  ).toMatchSnapshot('foo.jpg')
})

test('<Avatar> -> alt', () => {
  expect(renderFragment(<Avatar size="sm" alt="me" />)).toMatchSnapshot('me')
})

test('<Avatar> -> custom renderer', () => {
  expect(
    renderFragment(<Avatar size="sm" children={() => <img src="foo.jpg" />} />)
  ).toMatchSnapshot('foo.jpg')
})
