import {css} from '@emotion/core'


const fromY = css`
  right: 0;
  left: 0;
  min-width: 100%;
  width: 100%;
  min-height: auto;
  overflow-x: auto;
`

const fromX = css`
  top: 0;
  bottom: 0;
  min-height: 100%;
  min-width: auto;
  overflow-y: auto;
`

export const fromTop = css`
  ${fromY};
  top: 0;
  bottom: auto;
`
export const fromRight = css`
  ${fromX};
  right: 0;
  left: auto;
`
export const fromBottom = css`
  ${fromY};
  bottom: 0;
  top: auto;
`
export const fromLeft = css`
  ${fromX};
  left: 0;
  right: auto;
`
