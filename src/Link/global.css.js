import {injectGlobal} from 'emotion'


export default injectGlobal`
  a {
    cursor: pointer;
    text-decoration: none;
  }

  a:active,
  a:hover {
    outline-width: 0;
  }
`
