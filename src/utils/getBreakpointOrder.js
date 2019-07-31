import {fastMemoize} from '@style-hooks/core'


export default fastMemoize('breakpointOrder', breakpoints => Object.keys(breakpoints), WeakMap)