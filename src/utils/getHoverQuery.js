import {css} from '@emotion/core'
import memoize from 'trie-memoize'

export default memoize(
  [Map, Map],
  (CSS, noneCSS) => css`
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
)
