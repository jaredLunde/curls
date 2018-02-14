import deepMerge from '../utils/deepMerge'
import defaultColors from './defaultColors'
import defaultTypeFaces from './defaultTypeFaces'


export const baseTheme = {
  colors: defaultColors,
  typeFaces: defaultTypeFaces
}


function throwThemeError (theme) {
  if (theme.colors === void 0 || theme.typeFaces === void 0) {
    throw new Error(`Curls themes must include a global 'colors' and 'typeFaces' property.`)
  }
}


export function replaceTheme (prevTheme, theme) {
  let nextTheme
  theme = {...baseTheme, ...theme}

  if (__DEV__) {
    nextTheme = Object.freeze(theme)
    throwThemeError(nextTheme)
  }
  else {
    nextTheme = theme
  }

  return nextTheme
}


export default function injectTheme (prevTheme, theme) {
  let nextTheme
  theme = deepMerge(prevTheme, theme)

  if (__DEV__) {
    nextTheme = Object.freeze(theme)
    throwThemeError(nextTheme)
  }
  else {
    nextTheme = theme
  }

  return nextTheme
}
