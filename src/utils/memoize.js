function Cache (mapConstructor) {
  const cache = new mapConstructor()


  function get (arg1, arg2) {
    const base = cache.get(arg1)

    if (base === void 0) {
      return base
    }
    else {
      return base.get(arg2)
    }
  }

  function set (arg1, arg2, value) {
    const base = cache.get(arg1)

    if (base === void 0) {
      const vMap = new mapConstructor()
      vMap.set(arg2, value)
      cache.set(arg1, vMap)
    }
    else {
      base.set(arg2, value)
    }

    return value
  }

  return {get, set}
}


export default function memoize (mapConstructor = WeakMap) {
  const cache = Cache(mapConstructor)

  return function (fn) {
    return function (arg1, arg2) {
      let item = cache.get(arg1, arg2)

      if (item === void 0) {
        return cache.set(arg1, arg2, fn(arg1, arg2))
      }

      return item
    }
  }
}
