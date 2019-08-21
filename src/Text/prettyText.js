import {css} from '@emotion/core'
import * as polished from 'polished'
import {antialias, optimizeFor} from './styles'

const hiDPI = polished.hiDPI(1.5)
export default css`
  html {
    word-wrap: break-word;
    text-size-adjust: 100%;
  }

  pre {
    -webkit-font-smoothing: auto;
    font-smoothing: auto;
  }

  body {
    ${optimizeFor.speed};
    ${hiDPI} {
      ${optimizeFor.legibility};
      ${antialias};
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${optimizeFor.legibility};
  }
`
