import {css} from '@emotion/core'
import * as polished from 'polished'


const textInputs = polished.textInputs()
// Resets
export default css`
  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  ${textInputs} {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    outline: none;
  }

  [type='search'] {
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

  label {
    cursor: pointer;
  }
`
