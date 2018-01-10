import {css} from 'emotion'


export const flex = css`display: flex;`
export const fixed = css`flex: 0 0 auto;`
export const fluid = css`
  flex: 1 1 auto;
  max-width: none;
`
export const first = css`order: 1;`
export const last = css`order: -1;`
export const grow = css`flex-grow: 1;`
export const shrink = css`flex-shrink: 1;`
export const row = css`flex-direction: row;`
export const column = css`flex-direction: column;`
export const reverseX = css`flex-direction: row-reverse;`
export const reverseY = css`flex-direction: column-reverse;`
export const nowrap = css`flex-wrap: nowrap;`
export const wrap = css`flex-wrap: wrap;`
export const wrapReverse = css`flex-wrap: wrap-reverse;`
export const justify = {
  start: css`justify-content: flex-start;`,
  end: css`justify-content: flex-end;`,
  center: css`justify-content: center;`,
  around: css`justify-content: space-around;`,
  between: css`justify-content: space-between;`,
}
export const align = {
  start: css`align-items: flex-start;`,
  end: css`align-items: flex-end;`,
  center: css`align-items: center;`,
  stretch: css`align-items: stretch;`,
  baseline: css`align-items: baseline;`,
}
export const alignContent = {
  start: css`align-content: flex-start;`,
  end: css`align-content: flex-end;`,
  center: css`align-content: center;`,
  stretch: css`align-content: stretch;`,
  between: css`align-content: space-between;`,
  around: css`align-content: space-around;`,
}
export const alignSelf = {
  start: css`align-self: flex-start;`,
  end: css`align-self: flex-end;`,
  center: css`align-self: center;`,
  stretch: css`align-self: stretch;`,
  baseline: css`align-self: baseline;`
}
