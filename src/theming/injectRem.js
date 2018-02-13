import {toSize} from '../utils'


export default function (fontSize) {
  document.documentElement.style.fontSize = toSize(fontSize)
}
