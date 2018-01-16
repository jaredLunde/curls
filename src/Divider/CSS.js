import {css} from 'emotion'


export function thickness (value, theme) {
  return css`height: ${
      (value === null ? theme.defaultThickness : value) / theme.rem
    }rem;
  `
}
