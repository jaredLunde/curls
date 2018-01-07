import {injectGlobal} from 'emotion'
import {stripUnit} from 'polished'
import injectTheme from './injectTheme'

export default function (rem) {
  rem = stripUnit(rem)
  
  injectTheme({rem})
  injectGlobal`
    html {
      font-size: ${rem}px;
    }
  `
}
