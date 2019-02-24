const cache = {}

export default (cacheName, fn, CacheMap = Map) => {
  if (cache[cacheName] === void 0) {
    cache[cacheName] = new CacheMap()
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