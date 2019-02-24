import fastMemoize from './fastMemoize'


export default fastMemoize('breakPointOrder', breakPoints => Object.keys(breakPoints), WeakMap)