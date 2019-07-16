require('browser-env')()
import test from 'ava'
import React from 'react'
import {act} from '@testing-library/react'
import {renderWithTheme, renderHookWithThemeProvider} from '../testUtils'
import ThemeConsumer, {useTheme} from './ThemeConsumer'


const renderUseTheme = (name, defaultTheme, theme) => renderHookWithThemeProvider(
  () => useTheme(name, defaultTheme),
  theme
)

test('useTheme', t => {
  t.pass()
})

test('useTheme w/ component name', t => {
  t.pass()
})

test('useTheme w/ default theme', t => {
  t.pass()
})

test('ThemeConsumer', t => {
  t.pass()
})

test('ThemeConsumer w/ component name', t => {
  t.pass()
})

test('ThemeConsumer w/ default theme', t => {
  t.pass()
})
