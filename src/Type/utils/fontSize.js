import {css} from 'emotion'
import {legible, speedy} from '../CSS'

const legibleText = ['lg', 'xl', 'xxl']

export default function fontSize (size, theme) {
  const textRendering = legibleText.indexOf(size) > -1 ? legible : speedy
  return css`font-size: ${theme.scale[size] / theme.rem}rem; ${textRendering};`
}
