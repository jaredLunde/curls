import {css} from '@emotion/core'


export default (CSS, noneCSS) => {
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
