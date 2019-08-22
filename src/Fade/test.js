import {act} from 'react-dom/test-utils'
import {renderProps} from 'test-utils'
import {Fade} from './Fade'

const renderFade = renderProps(Fade)

test('<Fade> -> show', () => {
  const state = renderFade({})
  expect(state.isVisible).toBe(false)
  act(state.show)
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot()
})

test('<Fade> -> show [controlled]', () => {
  const state = renderFade({visible: false})
  expect(state.isVisible).toBe(false)
  act(state.show)
  expect(state.isVisible).toBe(false)
  expect(state.css).toMatchSnapshot()
})

test('<Fade> -> hide', () => {
  const state = renderFade({initiallyVisible: true})
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot('visible')
  act(state.hide)
  expect(state.isVisible).toBe(false)
  expect(state.css).toMatchSnapshot('hidden')
})

test('<Fade> -> hide [controlled]', () => {
  const state = renderFade({visible: true})
  expect(state.isVisible).toBe(true)
  act(state.hide)
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot()
})

test('<Fade> -> toggle', () => {
  const state = renderFade({})
  expect(state.isVisible).toBe(false)
  expect(state.css).toMatchSnapshot('hidden')
  act(state.toggle)
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot('visible')
  act(state.toggle)
  expect(state.isVisible).toBe(false)
  expect(state.css).toMatchSnapshot('hidden [2]')
})

test('<Fade> -> toggle [controlled]', () => {
  const state = renderFade({visible: true})
  expect(state.isVisible).toBe(true)
  act(state.toggle)
  expect(state.isVisible).toBe(true)
  expect(state.css).toMatchSnapshot()
})

test('<Fade> -> delay]', () => {
  const state = renderFade({delay: 3000})
  act(state.show)
  expect(state.css).toMatchSnapshot()
})

test('<Fade> -> from, to]', () => {
  const state = renderFade({from: 0.2, to: 0.8})
  expect(state.css).toMatchSnapshot('0.2')
  act(state.show)
  expect(state.css).toMatchSnapshot('0.8')
})
