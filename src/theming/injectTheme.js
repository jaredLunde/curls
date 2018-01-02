import deepMerge from '../utils/deepMerge'


export let curlsTheme = {}


export function replaceTheme (theme) {
  curlsTheme = theme
}


export default function injectTheme (theme) {
  // has side effects on curlsTheme
  curlsTheme = deepMerge(curlsTheme, theme)
}
