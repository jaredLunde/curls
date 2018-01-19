import {injectGlobal} from 'emotion'
import {stripUnit} from 'polished'
import injectTheme from './injectTheme'
import {toSize} from '../utils'

export default function (rem) {
  rem = toSize(rem)
  injectTheme({rem})

  injectGlobal`
    html {
      font-size: ${rem};
    }
  `
}
