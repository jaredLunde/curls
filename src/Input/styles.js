import {css} from '@emotion/core'

const placeholder = p => {
  if (!p) {
    return null
  }

  return css`
    ::-webkit-input-placeholder {
      ${p};
    }

    ::-moz-placeholder {
      ${p};
    }

    :-ms-input-placeholder {
      ${p};
    }

    ::placeholder {
      ${p};
    }
  `
}

export const __inputStyles = (_, theme, props) => [
    placeholder(theme.getPlaceholderClass(theme, props)),
    theme.getHoverClass(theme, props),
    theme.getFocusClass(theme, props),
 ]
