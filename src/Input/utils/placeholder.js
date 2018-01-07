import {css} from 'emotion'
import {colorize} from '../../utils'
// import * as CSS from '../Type/CSS'

export default function (value, theme) {
  const placeholder = css`
    ${colorize('color', value === null ? theme.defaultPlaceholderColor : value, theme)};
    opacity: ${theme.defaultPlaceholderOpacity};
  `
  //${colorizeProps('color', props, theme, theme.defaultFontColor)};
  //font-weight: ${CSS[theme.defaultFontWeight]};
  return css`
    &::-moz-placeholder {
      ${placeholder};
    }
    &::-webkit-placeholder {
      ${placeholder};
    }
    &::-placeholder {
      ${placeholder};
    }
  `
}
