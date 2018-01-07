import {curlsTheme} from '../theming/injectTheme'
import getTheme from './getTheme'
import getIn from './getIn'


export default function (defaultTheme, props, themePath) {
  const userTheme = props.theme
  defaultTheme = getTheme(defaultTheme, curlsTheme)
  const mainTheme = getTheme(getIn(curlsTheme, themePath), getIn(userTheme, themePath))
  // const typeTheme = getTheme(curlsTheme, mainTheme)
  console.log(getTheme(defaultTheme, mainTheme))
  return getTheme(defaultTheme, mainTheme)
}
