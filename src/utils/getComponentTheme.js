import getTheme from './getTheme'
import getIn from './getIn'
import {curlsTheme} from '../theming/injectTheme'


const GLOBALS = ['colors', 'hover', 'active', 'typeFaces']

export default function (defaultTheme, userTheme, themePath) {
  // overwrite default theme with the injected global theme
  let mainTheme = getTheme(defaultTheme, getIn(curlsTheme, themePath))
  // overwrite the main default theme with the user theme
  userTheme = getTheme(mainTheme, getIn(userTheme, themePath))
  // prevent unintended mutations
  const outTheme = {...userTheme}
  // overwrite global defaults
  for (let x = 0; x < GLOBALS.length; x++) {
    const g = GLOBALS[x]

    if (mainTheme[g] !== void 0) {
      const curls = getIn(curlsTheme, g)
      const user = getIn(userTheme, g)

      if (typeof user === 'object' && user !== null) {
        const userOverwrites = getTheme(curls, user)
        outTheme[g] = getTheme(mainTheme[g], userOverwrites)
      } else {
        outTheme[g] = getTheme(mainTheme[g], curls)
      }
    }
  }
  // attach the user theme
  return outTheme
}
