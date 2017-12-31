import {injectGlobal} from 'emotion'
import {hiDPI} from 'polished'
import {antialias, legible, speedy} from './CSS'


injectGlobal`
  html {
    word-wrap: break-word;
    text-size-adjust: 100%;
  }


  pre {
    -webkit-font-smoothing: auto;
    font-smoothing: auto;
  }


  body {
    ${speedy}
    font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", "Helvetica Neue", "Helvetica", sans-serif;

    ${hiDPI(1.5)} {
      ${legible}
      ${antialias}
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6  {
    ${legible}
    ${antialias}
  }
`
