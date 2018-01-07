import {injectGlobal} from 'emotion'
import {stripUnit} from 'polished'


export default function (rem) {
  injectGlobal`
    html {
      font-size: ${stripUnit(rem)}px;
    }
  `
}
