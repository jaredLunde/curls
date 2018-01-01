import {css} from 'emotion'


export default function withHoverQuery (CSS, noneCSS) {
  return css`
    ${CSS}

    @media (hover: hover) {
      ${CSS}
    }

    @media (hover: on-demand) {
      ${noneCSS}
    }

    @media (hover: none) {
      ${noneCSS}
    }
  `
}
