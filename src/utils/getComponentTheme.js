import getTheme from './getTheme'
import getIn from './getIn'
import {curlsTheme} from '../theming/injectTheme'


export default function (defaultTheme, userTheme, themePath) {
  const mainTheme = getTheme(defaultTheme, getIn(curlsTheme, themePath))
  return getTheme(mainTheme, getIn(userTheme, themePath))
}
