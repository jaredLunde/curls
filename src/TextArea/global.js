import {injectGlobal} from 'emotion'


export default injectGlobal`
  textarea {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    outline: none;
    margin: 0;
  }

  ::-moz-placeholder {
  	color: white;
  	opacity: 1;
  }
`
