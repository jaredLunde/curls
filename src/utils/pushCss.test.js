import {css} from '@emotion/core'
import pushCss from './pushCss'

test('pushCss -> ([], [])', () => {
  const input = {css: []}
  const result = pushCss(input, [
    css`
      display: block;
    `,
  ])
  expect(result).toMatchSnapshot()
  expect(result.css === input.css).toBe(true)
})

test('pushCss -> ([], {})', () => {
  const input = {css: []}
  const result = pushCss(
    input,
    css`
      display: block;
    `
  )
  expect(result).toMatchSnapshot()
  expect(result.css === input.css).toBe(true)
})

test('pushCss -> ({}, {})', () => {
  const input = {
    css: css`
      display: block;
    `,
  }
  const result = pushCss(
    input,
    css`
      display: inline;
    `
  )
  expect(result).toMatchSnapshot()
  expect(result === input).toBe(false)
})

test('pushCss -> ({}, [])', () => {
  const input = {
    css: css`
      display: block;
    `,
  }
  const result = pushCss(input, [
    css`
      display: inline;
    `,
  ])
  expect(result).toMatchSnapshot()
  expect(result === input).toBe(false)
})

test('pushCss -> (null, {})', () => {
  const input = {css: null}
  const result = pushCss(
    input,
    css`
      display: block;
    `
  )
  expect(result).toMatchSnapshot()
})

test('pushCss -> (null, [])', () => {
  const input = {css: null}
  const result = pushCss(input, [
    css`
      display: inline;
    `,
  ])
  expect(result).toMatchSnapshot()
})
