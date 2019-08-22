import React from 'react'
import {renderProps} from 'test-utils'
import {Transitionable} from './Transitionable'

const renderTransitionable = renderProps(Transitionable)

test('<Transitionable> -> property', () => {
  expect(renderTransitionable({property: 'transform'})).toMatchSnapshot('string property')
  expect(renderTransitionable({property: ['transform', 'width']})).toMatchSnapshot('array property')
})

test('<Transitionable> -> easing', () => {
  expect(renderTransitionable({easing: 'swiftMove'})).toMatchSnapshot('swiftMove')
  let theme = {
    transitionable: {
      easing: {
        in: [0.4, 0, 1, 1]
      }
    }
  }
  expect(renderTransitionable({easing: 'in'}, theme)).toMatchSnapshot('themed')
})

test('<Transitionable> -> duration', () => {
  expect(renderTransitionable({duration: 'fast'})).toMatchSnapshot('fast')
  let theme = {
    transitionable: {
      duration: {
        wonky: 3000
      }
    }
  }
  expect(renderTransitionable({duration: 'wonky'}, theme)).toMatchSnapshot('themed')
})

test('<Transitionable> -> delay', () => {
  expect(renderTransitionable({delay: 3000})).toMatchSnapshot('3000')
})