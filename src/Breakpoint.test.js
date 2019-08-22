import React from 'react'
import {renderProps} from 'test-utils'
import {act} from 'react-dom/test-utils'
import {Breakpoint} from './Breakpoint'

const renderBreakpoint = renderProps(Breakpoint)

test('<Breakpoint> -> matchesAny [true]', () => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: query.includes(': 0em'),
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }
  })
  let state = renderBreakpoint({phone: true, tablet: true})
  expect(state.matchesAny).toBe(true)
})

test('<Breakpoint> -> matchesAny [false]', () => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: false,
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }
  })
  let state = renderBreakpoint({phone: true, tablet: true})
  expect(state.matchesAny).toBe(false)
})

test('<Breakpoint> -> matchesAll [true]', () => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: true,
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }
  })
  let state = renderBreakpoint({phone: true, tablet: true, desktop: true})
  expect(state.matchesAll).toBe(true)
})

test('<Breakpoint> -> matchesAll [false]', () => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: query.includes(': 0em'),
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }
  })
  let state = renderBreakpoint({phone: true, tablet: true, desktop: true})
  expect(state.matchesAll).toBe(false)
})

test('<Breakpoint> -> matches', () => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: query.includes(': 0em'),
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }
  })
  let state = renderBreakpoint({phone: true, tablet: true, desktop: true})
  expect(state.matches.phone).toBe(true)
  expect(state.matches.tablet).toBe(false)
  expect(state.matches.desktop).toBe(false)
})

test('<Breakpoint> -> dispatch', () => {
  const listeners = []

  window.matchMedia = jest.fn().mockImplementation(query => {
    let listener

    const mq = {
      matches: false,
      media: query,
      addListener: cb => {
        listener = [cb, mq]
        listeners.push(listener)
      },
      removeListener: () => listeners.splice(listeners.indexOf(listener), 1),
    }

    return mq
  })

  const dispatch = doesMatch => {
    listeners.forEach(([cb, mq]) => {
      mq.matches = doesMatch
      cb(mq)
    })
  }

  let state = renderBreakpoint({phone: true, tablet: true, desktop: true})
  expect(state.matches).toStrictEqual({
    phone: false,
    tablet: false,
    desktop: false,
  })

  act(() => dispatch(true))
  expect(state.matches).toStrictEqual({
    phone: true,
    tablet: true,
    desktop: true,
  })

  act(() => dispatch(false))
  expect(state.matches).toStrictEqual({
    phone: false,
    tablet: false,
    desktop: false,
  })
})

test('<Breakpoint> -> defaultMatches', () => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: query.includes(': 0em'),
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }
  })
  let state = renderBreakpoint({phone: true, defaultMatches: ['phone']})
  expect(state.matches.phone).toBe(true)
  const mock = jest.fn(() => ['phone'])
  renderBreakpoint({phone: true, defaultMatches: mock})
  expect(mock).toBeCalled()
})
