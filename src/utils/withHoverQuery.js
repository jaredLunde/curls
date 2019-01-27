import {css} from '@emotion/core'


export default function withHoverQuery (CSS, noneCSS) {
  return css`
    ${CSS};

    @media (hover: hover) {
      ${CSS};
    }

    @media (hover: on-demand) {
      ${noneCSS};
    }

    @media (hover: none) {
      ${noneCSS};
    }
  `
}
