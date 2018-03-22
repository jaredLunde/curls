import {toSize} from '../utils'


export default function (fontSize) {
  if (typeof document !== void 0) {
    document.documentElement.style.fontSize = toSize(fontSize)
  }
}
