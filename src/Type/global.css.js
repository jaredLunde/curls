import {injectGlobal} from 'emotion'
import * as polished from 'polished'
import {antialias, optimizeFor} from './CSS'
import {defaultTypeFaces} from '../theming'


export default injectGlobal`
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
    font-family: ${defaultTypeFaces.system};

    ${polished.hiDPI(1.5)} {
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
`
