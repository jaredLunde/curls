import {bg as boxBg} from '../Box/CSS'


export function bg (value, theme) {
  return boxBg(value === null ? theme.defaultBg : value, theme)
}
