import deepMerge from '../utils/deepMerge'
import defaultColors from './defaultColors'
import defaultTypeFaces from './defaultTypeFaces'


const baseTheme = {
  colors: defaultColors,
  typeFaces: defaultTypeFaces
}


export let curlsTheme = {...baseTheme}


function throwThemeError () {
  if (curlsTheme.colors === void 0 || curlsTheme.typeFaces === void 0) {
    throw new Error(`Curls themes must include a global 'colors' and 'typeFaces' property.`)
  }
}


export function replaceTheme (prevTheme, theme) {
  let nextTheme
  theme = {...baseTheme, ...theme}

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    nextTheme = Object.freeze(theme)
    throwThemeError()
  }
  else {
    nextTheme = theme
  }

  return nextTheme
}


export default function injectTheme (prevTheme, theme) {
  let nextTheme
  theme = deepMerge(prevTheme, theme)

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    nextTheme = Object.freeze(theme)
    throwThemeError()
  }
  else {
    nextTheme = theme
  }

  return nextTheme
}
