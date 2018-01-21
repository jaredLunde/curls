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


export function replaceTheme (theme) {
  theme = {...baseTheme, ...theme}

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    curlsTheme = Object.freeze(theme)
    throwThemeError()
  }
  else {
    curlsTheme = theme
  }

  return curlsTheme
}


export default function injectTheme (theme) {
  theme = deepMerge(curlsTheme, theme)
  
  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    curlsTheme = Object.freeze(theme)
    throwThemeError()
  }
  else {
    curlsTheme = theme
  }

  return curlsTheme
}
