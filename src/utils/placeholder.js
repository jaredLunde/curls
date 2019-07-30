import {css} from '@emotion/core'


export default p => {
  if (!p) return null

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