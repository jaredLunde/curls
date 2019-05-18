const cache = new Map()

export default (cacheName, fn, CacheMap = Map) => {
  if (cache.get(cacheName) === void 0) {}
    cache.set(cacheName, new CacheMap())

  return arg => {
    let
      base = cache.get(cacheName),
      val = base.get(arg)

    if (val === void 0) {
      val = fn(arg)
      base.set(arg, val)
    }

    return val
  }
}