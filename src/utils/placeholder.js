import {css} from '@emotion/core'

export default p => {
  if (!p) return null

  return css`
    ::placeholder {
      ${p};
    }
  `
}
