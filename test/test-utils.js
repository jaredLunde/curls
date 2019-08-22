import React from 'react'
import {renderHook} from '@testing-library/react-hooks'
import {render as renderComponent} from '@testing-library/react'
import TestRenderer from 'react-test-renderer'
import {CurlsContext, ThemeProvider, createTheme} from 'ThemeProvider'


export const renderHookWithTheme = (children, userTheme = {}) => {
  const theme = createTheme(userTheme)
  return renderHook(children, {
    wrapper: ({children}) => (
      <CurlsContext.Provider value={theme} children={children}/>
    ),
  })
}

export const renderHookWithThemeProvider = (children, theme = {}) =>
  renderHook(children, {
    wrapper: ({children}) => (
      <ThemeProvider theme={theme} children={children}/>
    ),
  })

export const render = (children, theme = {}, options = {}) =>
  renderComponent(children, {
    wrapper: ({children}) => (
      <ThemeProvider theme={theme} children={children}/>
    ),
    ...options,
  })

export const renderFragment = (children, theme = {}, options = {}) =>
  renderComponent(children, {
    wrapper: ({children}) => (
      <ThemeProvider theme={theme} children={children}/>
    ),
    ...options,
  }).asFragment()

export const renderErrorFragment = (children, theme = {}, options = {}) =>
  () => {
    const originalError = console.error
    console.error = () => {}
    const result = renderFragment(children, theme, options)
    console.error = originalError
    return result
  }

export const renderProps = Component => (props = {}, theme = {}) => {
  let val = {}

  render(
    <Component {...props}>
      {state => {
        val = Object.assign(val, state)
        return null
      }}
    </Component>,
    theme
  )

  return val
}

export const renderPropsNode = Component => (props = {}) => {
  let val = {}

  TestRenderer.create(
    <Component {...props}>
      {state => {
        val = Object.assign(val, state)
        return null
      }}
    </Component>
  )

  return val
}