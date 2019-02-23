const cache = {}

export default (cacheName, fn) => {
  if (cache[cacheName] === void 0) {
    cache[cacheName] = new Map()
  }

  return arg => {
    let val = cache[cacheName].get(arg)

    if (val === void 0) {
      val = fn(arg)
      cache[cacheName].set(arg, val)
    }

    return val
  }
}