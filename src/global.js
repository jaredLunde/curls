import {injectGlobal} from 'emotion'

injectGlobal`
  *, *:before, *:after {
    /** border-box for all, as it should be */
    box-sizing: border-box;
  }

  a {
    cursor: pointer;
  }
`


export const MAX_Z_INDEX = 2147483647;
export const MAX_PX = '10000000px';
