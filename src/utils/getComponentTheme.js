import getTheme from './getTheme'
import {curlsTheme} from '../theming/injectTheme'


export default function (defaultTheme, userTheme, themePath) {
  // merge the component's default theme with the injected theme
  let mainTheme = getTheme(defaultTheme, curlsTheme[themePath])
  // overrides existing colors/typeFaces in the theme with the latest curls
  // theme colors/typeFaces
  mainTheme.colors = curlsTheme.colors
  mainTheme.typeFaces = curlsTheme.typeFaces
  // get the component-level theme if there is one
  userTheme = userTheme && userTheme[themePath]

  if (typeof userTheme === 'object' && userTheme !== null) {
    // merge the component-level theme to the main theme
    mainTheme = getTheme(mainTheme, userTheme)
  }

  return mainTheme
}
