import {css} from 'emotion'
import {colorizeProps} from '../../utils'
// import * as CSS from '../Type/CSS'

export default function (props, theme) {
  const placeholder = css`
    ${colorizeProps('color', props, theme, theme.defaultPlaceholderColor)};
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
