import {injectGlobal} from 'emotion'


export default injectGlobal`
  textarea {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    outline: none;
  }

  ::-moz-placeholder {
  	color: white;
  	opacity: 1;
  }
`
