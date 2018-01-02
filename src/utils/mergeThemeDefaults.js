import {curlsTheme} from '../theming/injectTheme'
import getTheme from './getTheme'
import getIn from './getIn'


export default function ({defaultTheme, themePath, props, defaults = []}) {
  const userTheme = props.theme
  defaultTheme = getTheme(defaultTheme, curlsTheme)
  const mainTheme = getTheme(getIn(curlsTheme, themePath), getIn(userTheme, themePath))
  // const typeTheme = getTheme(curlsTheme, mainTheme)
  const theme = getTheme(defaultTheme, mainTheme)

  if (!mainTheme) {
    return theme
  }

  for (let x = 0; x < defaults.length; x++) {
    const def = defaults[x]
    theme[def] = mainTheme[def] ? mainTheme[def] : theme[def]
  }

  return theme
}
