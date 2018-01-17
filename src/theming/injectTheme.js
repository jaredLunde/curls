import deepMerge from '../utils/deepMerge'
import defaultColors from './defaultColors'
import defaultTypeFaces from './defaultTypeFaces'
import defaultRem from './defaultRem'


export let curlsTheme = {
  rem: defaultRem,
  colors: defaultColors,
  typeFaces: defaultTypeFaces
}


function throwThemeError () {
  if (curlsTheme.colors === void 0 || curlsTheme.typeFaces === void 0) {
    throw new Error(`Curls themes must include a global 'colors' and 'typeFaces' property.`)
  }
}


export function replaceTheme (theme) {
  curlsTheme = theme

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    throwThemeError()
  }
}


export default function injectTheme (theme) {
  // has side effects on curlsTheme
  curlsTheme = deepMerge(curlsTheme, theme)

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    throwThemeError()
  }
}
