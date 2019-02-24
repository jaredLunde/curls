import fastMemoize from './fastMemoize'


export default fastMemoize('breakpointOrder', breakpoints => Object.keys(breakpoints), WeakMap)