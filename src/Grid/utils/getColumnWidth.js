import {css} from '@emotion/core'
import {d} from '../../Box/CSS'
import {flex} from '../../Flex/CSS'
import {getMediaQuery} from '../../utils'


export default (size, x, theme, props) => {
  if (x === false) {
    return null
  }

  x = parseInt(x)
  const numColumns = theme.columns[size]

  if (__DEV__) {
    if (x < 0 || x > theme.columns[size]) {
      console.warn(`Column count for grid size '${size}' must be between 0 and ${numColumns}`)
    }
  }

  const width = `${(x / numColumns) * 100}%`

  return css`
    ${getMediaQuery(size, theme)} {
      ${x === 0 ? d.none : props.d ? d[props.d] : props.flex ? flex : 'display: initial'};
      max-width: ${width};
      ${props.useFlex && `flex-basis: ${width}`};
    }
  `
  // : `width: ${width}`
}
