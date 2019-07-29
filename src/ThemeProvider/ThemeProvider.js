import React, {useMemo, useContext} from 'react'
import {css, Global} from '@emotion/core'
import {ThemeProvider as ThemeProvider_, useStylesContext, fastMemoize} from '@style-hooks/core'
import emptyArr from 'empty/array'
import {toSize} from '../utils'


export const defaultColors = {
  blue: '#4bb0de',
  green: '#53c492',
  red: '#e56873',
  yellow: '#fffbb8',
  lightestGrey: '#f4f4f5',
  lightGrey: '#b5b5b3',
  grey: '#666a6f',
  darkGrey: '#4e5154',
  darkestGrey: '#2c3b3f',
  black: '#0f2223',
  white: '#fefeff',
  translucent: 'rgba(0,0,0,0.4)',
  translucentDark: 'rgba(0,0,0,0.7)',
  translucentLight: 'rgba(0,0,0,0.16)',
  translucentWhite: 'rgba(255,255,255,0.6)',
}

export const defaultTheme = {
  baseRem: 100,
  breakpoints: {
    phone: 0,    // only screen and (min-width: 0em)   // 0px
    tablet: 35,  // only screen and (min-width: 35em)  // 560px
    desktop: 80, // only screen and (min-width: 80em)  // 1280px
  },
  breakpointsDelimiter: '@',
  colors: defaultColors,
  locals: {},
  mediaQueries: {},
  spacingScale: [
    0,
    1/4,
    1/2,
    1,
    2,
    4,
    8,
    16
  ],
  spacingUnit: 'rem',
  sizeUnit: 'px'
}

const createTheme = fastMemoize(
  'createCurlsTheme',
  theme => Object.assign({}, defaultTheme, theme),
  WeakMap
)

export const
  CurlsContext = React.createContext({}),
  CurlsConsumer = CurlsContext.Consumer,
  useCurls = () => useContext(CurlsContext)

const CurlsProvider = ({globalStyles = emptyArr, children}) => {
  const
    {theme, mergeTheme, replaceTheme} = useStylesContext(),
    styles = useMemo(
      () => {
        const s = [css`html { font-size: ${toSize(theme.baseRem, '%')} }`]
        s.push.apply(s, globalStyles)
        return s
      },
      [theme.baseRem, globalStyles]
    ),
    context = useMemo(
      () => ({
        theme,
        mergeTheme,
        replaceTheme: theme => replaceTheme(createTheme(theme)),
      }),
      [theme, mergeTheme, replaceTheme]
    )

  return (
    <CurlsContext.Provider value={context}>
      <Global styles={styles}/>
      {children}
    </CurlsContext.Provider>
  )
}

export const ThemeProvider = ({theme, globalStyles, children}) => (
  <ThemeProvider_ theme={createTheme(theme)}>
    <CurlsProvider globalStyles={globalStyles} children={children}/>
  </ThemeProvider_>
)

if (__DEV__) {
  const PropTypes = require('prop-types')
  ThemeProvider.displayName = 'ThemeProvider'
  ThemeProvider.propTypes = {theme: PropTypes.object}
}