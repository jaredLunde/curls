import {css} from 'emotion'


export default function (size, theme) {
  return css`
    width: ${theme.scale[size]}rem;
    height: ${theme.scale[size]}rem;
  `
}
