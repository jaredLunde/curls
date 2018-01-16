import {css} from 'emotion'
import {touchScrolling, ov} from '../Box/CSS'


export const scrollable = css`
  ${touchScrolling};
  ${ov.scrollX};
`
