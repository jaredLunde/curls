import {injectGlobal} from 'emotion'
import {stripUnit} from 'polished'
import injectTheme from './injectTheme'
import {toSize} from '../utils'

export default function (fontSize) {
  document.documentElement.style.fontSize = toSize(fontSize) 
}
