import {css} from 'emotion'
import {bg as boxBg} from '../Box/CSS'


export function thickness (value, theme) {
  return css`height: ${value === null ? theme.defaultThickness : value}rem;`
}

export function bg (value, theme) {
  return boxBg(value === null ? theme.defaultBg : value, theme)
}
