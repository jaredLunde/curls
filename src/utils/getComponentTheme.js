import getTheme from './getTheme'
import getIn from './getIn'
import {curlsTheme} from '../theming/injectTheme'
import defaultRem from '../theming/defaultRem'

const GLOBALS = ['colors', 'hover', 'active', 'typeFaces']


export default function (defaultTheme, userTheme, themePath) {
  // merge the component's default theme with the injected theme
  const mainTheme = getTheme(defaultTheme, getIn(curlsTheme, themePath))

  // ensure no funky mutations take place on the output
  let out = {...mainTheme}
  out.rem = curlsTheme.rem || defaultRem
  // get the component-level theme if there is one
  userTheme = getIn(userTheme, themePath)

  if (typeof userTheme === 'object' && userTheme !== null) {
    // merge the component-level theme to the main theme
    out = getTheme(mainTheme, userTheme)
    // merge global themes (colors, typeFaces) to the output
    for (let x = 0; x < GLOBALS.length; x++) {
      const g = GLOBALS[x]

      if (mainTheme[g] !== void 0) {
        // only inherits themes that are defined in the defaultTheme
        const curlsGlobal = getIn(curlsTheme, g)
        const userGlobal = getIn(userTheme, g)
        out[g] = getTheme(curlsGlobal, getTheme(mainTheme[g], userGlobal))
      }
    }

    out.rem = userTheme.rem || out.rem
  } else {
    // no component-level theme was defined
    // merge global themes (colors, typeFaces) to the output
    for (let x = 0; x < GLOBALS.length; x++) {
      const g = GLOBALS[x]

      if (mainTheme[g] !== void 0) {
        // only inherits themes that are defined in the defaultTheme
        out[g] = getTheme(getIn(curlsTheme, g), mainTheme[g])
      }
    }
  }


  return out
}
