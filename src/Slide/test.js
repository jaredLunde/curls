import React from 'react'
import {act} from 'react-dom/test-utils'
import {renderProps} from 'test-utils'
import {Slide} from './Slide'

const renderSlide = renderProps(Slide)

test('<Slide> -> show', () => {
  const state = renderSlide({})
  expect(state.isVisible).toBe(false)
  act(state.show)
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot('visible')
})

test('<Slide> -> show [controlled]', () => {
  const state = renderSlide({visible: false})
  expect(state.isVisible).toBe(false)
  act(state.show)
  expect(state.isVisible).toBe(false)
  expect(state.css).toMatchSnapshot('hidden')
})

test('<Slide> -> hide', () => {
  const state = renderSlide({initiallyVisible: true})
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot('visible')
  act(state.hide)
  expect(state.isVisible).toBe(false)
  expect(state.css).toMatchSnapshot('hidden')
})

test('<Slide> -> hide [controlled]', () => {
  const state = renderSlide({visible: true})
  expect(state.isVisible).toBe(true)
  act(state.hide)
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot('visible')
})

test('<Slide> -> toggle', () => {
  const state = renderSlide({})
  expect(state.isVisible).toBe(false)
  expect(state.css).toMatchSnapshot('hidden')
  act(state.toggle)
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot('visible')
  act(state.toggle)
  expect(state.isVisible).toBe(false)
  expect(state.css).toMatchSnapshot('hidden [2]')
})

test('<Slide> -> toggle [controlled]', () => {
  const state = renderSlide({visible: true})
  expect(state.isVisible).toBe(true)
  act(state.toggle)
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot('visible')
})

test('<Slide> -> delay]', () => {
  const state = renderSlide({delay: 3000})
  act(state.show)
  expect(state.css).toMatchSnapshot('3000')
})

test('<Slide> -> distanceUnit]', () => {
  let state = renderSlide({fromBottom: 36})
  expect(state.css).toMatchSnapshot('px')
  state = renderSlide({fromBottom: 36}, {slide: {distanceUnit: 'rem'}})
  expect(state.css).toMatchSnapshot('rem')
})

test('<Slide> -> directions]', () => {
  for (let direction of ['fromTop', 'fromRight', 'fromBottom', 'fromLeft']) {
    let state = renderSlide({[direction]: true})
    expect(state.css).toMatchSnapshot(`${direction} (true)`)
    state = renderSlide({[direction]: 36})
    expect(state.css).toMatchSnapshot(`${direction} (36 int)`)
    act(state.show)
    expect(state.css).toMatchSnapshot(`${direction} (0 int)`)
    state = renderSlide({[direction]: '36'})
    expect(state.css).toMatchSnapshot(`${direction} (36 string)`)
  }
})