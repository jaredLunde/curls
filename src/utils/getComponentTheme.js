import getTheme from './getTheme'
import {curlsTheme} from '../theming/injectTheme'


export default function (defaultTheme, userTheme, themePath) {
  const hasThemePath = themePath.length
  // merge the component's default theme with the injected theme
  const mainTheme = getTheme(
    defaultTheme,
    hasThemePath === 0 ? curlsTheme : curlsTheme[themePath]
  )
  // ensure no funky mutations take place on the output. only need to do this
  // when a theme path is defined because otherwise nothing will be assigned
  // directly to `out`
  let out = hasThemePath ? Object.assign({}, mainTheme) : mainTheme
  // get the component-level theme if there is one
  userTheme = userTheme && userTheme[themePath]

  if (typeof userTheme === 'object' && userTheme !== null) {
    // merge the component-level theme to the main theme
    out = getTheme(mainTheme, userTheme)

    if (hasThemePath) {
      out.colors = getTheme(curlsTheme.colors, mainTheme.colors)
      out.typeFaces = getTheme(curlsTheme.typeFaces, mainTheme.typeFaces)
    }
  }
  else if (hasThemePath) {
    // no component-level theme was defined
    // merge global themes (colors, typeFaces) to the output if they weren't
    // merged above already
    out.colors = getTheme(curlsTheme.colors, mainTheme.colors)
    out.typeFaces = getTheme(curlsTheme.typeFaces, mainTheme.typeFaces)
  }


  return out
}
