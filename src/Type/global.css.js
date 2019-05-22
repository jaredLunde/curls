import {css} from '@emotion/core'
import * as polished from 'polished'
import {defaultColors} from '../ThemeProvider/createTheme'
import {antialias, optimizeFor} from './styles'
import {faces} from './defaultTheme'


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
    font-family: ${faces.system};
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
  h6  {
    ${optimizeFor.legibility};
  }
  
  p {
    word-break: break-word;
    line-height: 1.4;
    margin-bottom: 1rem;
  }
`