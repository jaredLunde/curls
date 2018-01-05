import getTheme from './getTheme'
import getIn from './getIn'
import {curlsTheme} from '../theming/injectTheme'


export default function (defaultTheme, userTheme, themePath) {
  let mainTheme = getTheme(defaultTheme, curlsTheme)
  
  if (themePath) {
    mainTheme = getTheme(mainTheme, getIn(curlsTheme, themePath))
  }

  return getTheme(mainTheme, getIn(userTheme, themePath))
}
