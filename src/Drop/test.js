import React from 'react'
import {act} from 'react-dom/test-utils'
import {renderProps} from 'test-utils'
import {Drop} from './Drop'

const renderDrop = renderProps(Drop)

test('<Drop> -> show', () => {
  const state = renderDrop({})
  expect(state.isVisible).toBe(false)
  act(state.show)
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot('visible')
})

test('<Drop> -> show [controlled]', () => {
  const state = renderDrop({visible: false})
  expect(state.isVisible).toBe(false)
  act(state.show)
  expect(state.isVisible).toBe(false)
  expect(state.css).toMatchSnapshot('hidden')
})

test('<Drop> -> hide', () => {
  const state = renderDrop({initiallyVisible: true})
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot('visible')
  act(state.hide)
  expect(state.isVisible).toBe(false)
  expect(state.css).toMatchSnapshot('hidden')
})

test('<Drop> -> hide [controlled]', () => {
  const state = renderDrop({visible: true})
  expect(state.isVisible).toBe(true)
  act(state.hide)
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot('visible')
})

test('<Drop> -> toggle', () => {
  const state = renderDrop({})
  expect(state.isVisible).toBe(false)
  expect(state.css).toMatchSnapshot('hidden')
  act(state.toggle)
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot('visible')
  act(state.toggle)
  expect(state.isVisible).toBe(false)
  expect(state.css).toMatchSnapshot('hidden [2]')
})

test('<Drop> -> toggle [controlled]', () => {
  const state = renderDrop({visible: true})
  expect(state.isVisible).toBe(true)
  act(state.toggle)
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot('visible')
})

test('<Drop> -> delay]', () => {
  const state = renderDrop({delay: 3000})
  act(state.show)
  expect(state.css).toMatchSnapshot('3000')
})

test('<Drop> -> distanceUnit]', () => {
  let state = renderDrop({fromBottom: 36})
  expect(state.css).toMatchSnapshot('px')
  state = renderDrop({fromBottom: 36}, {slide: {distanceUnit: 'rem'}})
  expect(state.css).toMatchSnapshot('rem')
})

test('<Drop> -> directions]', () => {
  for (let direction of ['fromTop', 'fromRight', 'fromBottom', 'fromLeft']) {
    let state = renderDrop({[direction]: true})
    expect(state.css).toMatchSnapshot(`${direction} (true)`)
    state = renderDrop({[direction]: 36})
    expect(state.css).toMatchSnapshot(`${direction} (36 int)`)
    act(state.show)
    expect(state.css).toMatchSnapshot(`${direction} (0 int)`)
    state = renderDrop({[direction]: '36'})
    expect(state.css).toMatchSnapshot(`${direction} (36 string)`)
  }
})