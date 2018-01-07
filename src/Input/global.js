import {injectGlobal} from 'emotion'
import {textInputs} from 'polished'


// Resets
export default injectGlobal`
  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  ${textInputs()} {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    outline: none;
    margin: 0;
  }

  [type="search"] {
    -webkit-appearance: none;
    outline-offset: -2px;
  }

  :focus {
    outline: 0
  }

  :-moz-placeholder {
  	color: white;
  	opacity: 1;
  }

  ::-moz-placeholder {
  	color: white;
  	opacity: 1;
  }
`
