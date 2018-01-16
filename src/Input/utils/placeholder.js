import {css} from 'emotion'


export default function (placeholder) {
  return css`
    &::-moz-placeholder {
      ${placeholder};
    }
    &::-webkit-placeholder {
      ${placeholder};
    }
    &::-placeholder {
      ${placeholder};
    }
  `
}
