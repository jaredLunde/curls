require('browser-env')()
import test from 'ava'
import React from 'react'
import {act} from '@testing-library/react'
import {renderWithTheme} from '../testUtils'
import createTheme, {mergeTheme, baseTheme} from './createTheme'
import {useCurls} from './ThemeProvider'


test('createTheme', t => {
  let theme = createTheme({})
  t.deepEqual(Object.keys(theme), Object.keys(baseTheme))
  theme = createTheme({colors: {blue: '#1d40ab'}})
  t.is(Object.keys(theme.colors).length, 1)
  t.is(theme.colors.blue, '#1d40ab')
})


test('createTheme breakpoints', t => {
  let theme = createTheme({
    breakpoints: {
      mobile: 0,
      largeMobile: 'only screen and (min-width: 45em)',
      smallDesktop:[
        {
          screen: true,
          minWidth: 1280
        },
        {orientation: 'landscape'}
      ]
    }
  })

  t.deepEqual(Object.keys(theme.breakpoints), ['mobile', 'largeMobile', 'smallDesktop'])
  t.is(theme.breakpoints.mobile, 'only screen and (min-width: 0em)')
  t.is(theme.breakpoints.largeMobile, 'only screen and (min-width: 45em)')
  t.is(theme.breakpoints.smallDesktop, 'screen and (min-width: 1280px), (orientation: landscape)')
})


test('mergeTheme object merge', t => {
  let theme = mergeTheme(
    createTheme({foo: {bar: 'baz'}}),
    {foo: {biz: 'buz'}}
  )

  t.deepEqual(theme.foo, {bar: 'baz', biz: 'buz'})
})


test('mergeTheme array replace', t => {
  let theme = mergeTheme(
    createTheme({foo: ['bar', 'baz']}),
    {foo: ['biz']}
  )

  t.deepEqual(theme.foo, ['biz'])
})


test('throws "required theme property"', t => {
  const error = t.throws(() => {createTheme({colors: void 0})}, ReferenceError)
  t.is(error.message, `Curls themes must include a global 'colors' property.`)
})


test('ThemeProvider -> useCurls -> theme, setTheme, replaceTheme', t => {
  let setTheme, replaceTheme, theme
  const Curls = props => {
    const curls = useCurls()
    setTheme = curls.setTheme
    replaceTheme = curls.replaceTheme
    theme = curls.theme
    return <div/>
  }
  let result = renderWithTheme(<Curls/>)
  // tests setTheme
  act(() => {setTheme({breakpoints: {large: 100}})})
  t.deepEqual(theme, {
    ...baseTheme,
    breakpoints: {
      ...createTheme({}).breakpoints,
      large: 'only screen and (min-width: 100em)'
    }
  })
  // tests replaceTheme
  act(() => {replaceTheme({breakpoints: {large: 100}})})
  t.deepEqual(theme, {
    ...baseTheme,
    breakpoints: {
      large: 'only screen and (min-width: 100em)'
    }
  })
  // tests theme={theme}
  result = renderWithTheme(<Curls/>, {
    box: {
      kinds: {
        foo: {
          display: 'block'
        }
      }
    }
  })

  t.deepEqual(theme.box.kinds.foo, {display: 'block'})
})