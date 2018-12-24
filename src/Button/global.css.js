import {injectGlobal} from 'emotion'


// resets default button styles
export default injectGlobal`
  button,
  [role=button] {
    outline: 0;
    background: none;
    border: 0;
    color: inherit;
    cursor: pointer;
    font: inherit;
    line-height: normal;
    overflow: visible;
    padding: 0;
    margin: 0;
    line-height: 1.0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  button::-moz-focus-inner {
    border: 0;
    margin: 0;
    padding: 0;
  }

  [role="button"] {
    text-decoration: none;
  }

  button:hover,
  button:active,
  [role=button]:hover,
  [role=button]:active {
    cursor: pointer;
  }

  button {
    text-align: inherit;
  }
`
