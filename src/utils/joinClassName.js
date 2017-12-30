import {cx} from 'react-emotion'
console.warn(`joinClassName() in Curls has been deprecated. Please import {cx} from 'emotion' instead.`)
export default cx

/**
function whichClassName (className) {
  return typeof className !== 'object'
    ? className
    : className.className
}


export default function (...classNames) {
  return (
    classNames.filter(className => className).map(whichClassName).join(' ')
    || void 0
  )
}
*/
