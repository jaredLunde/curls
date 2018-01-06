import {injectGlobal} from 'emotion'


export default injectGlobal`
  a {
    cursor: pointer;
  }

  a:active,
  a:hover {
    outline-width: 0;
  }
`
