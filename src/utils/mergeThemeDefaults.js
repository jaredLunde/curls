import getTheme from './getTheme'
import getIn from './getIn'


export default function ({defaultTheme, themePath, props, defaults = []}) {
  const userTheme = props.theme
  const theme = getTheme(defaultTheme, userTheme)
  const typeTheme = getIn(userTheme, themePath)

  if (!typeTheme) {
    return theme
  }

  for (let x = 0; x < defaults.length; x++) {
    const def = defaults[x]
    theme[def] = typeTheme[def] ? typeTheme[def] : theme[def]
  }

  return theme
}
