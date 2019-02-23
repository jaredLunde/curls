import memoize from 'cdll-memoize'


export default memoize(
  breakPoints => {
    const breakPointOrder = Object.keys(breakPoints)
    breakPointOrder.reverse()
    return breakPointOrder
  }
)