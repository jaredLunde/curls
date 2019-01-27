import {css} from '@emotion/core'


export default function (placeholder) {
  return css`
    ::-webkit-input-placeholder {
      ${placeholder};
    }

    ::-moz-placeholder {
      ${placeholder};
    }

    :-ms-input-placeholder {
      ${placeholder};
    }

    ::placeholder {
      ${placeholder};
    }
  `
}
