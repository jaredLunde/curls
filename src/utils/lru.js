function LRUCache (size) {
  const cache = []

  function getIterable (key) {
    let entry
    let x

    for (x = cache.length - 1; x > -1; x--) {
      const k = cache[x][0]
      let wasEqual = true

      for (let y = 0; y < k.length; y++) {
        if (key[y] !== k[y]) {
          wasEqual = false
          break;
        }
      }

      if (wasEqual) {
        entry = cache[x][1]
        break;
      }
    }

    return [entry, x]
  }

  function get (key) {
    const [item, index] = getIterable(key)

    // found a cached entry
    if (item !== void 0) {
      // move it to the end of the cache
      cache.splice(index, 1)
      cache.push([key, item])
      // return the entry
      return item
    }
    console.log('Uncached:', key)
    // no entry found in cache, return undefined
    return void 0
  }

  function set (key, value) {
    cache.push([key, value])
    // delete the entry at the front of the cache
    if (cache.length > size) {
      cache.unshift()
    }
  }

  return {get, set}
}


export default function memoize (size = 1,) {
  const cache = LRUCache(size)

  return function (fn) {
    return function (...args) {
      let key = args
      let item = cache.get(key)

      if (item === void 0) {
        item = fn(...args)
        cache.set(key, item)
      }

      return item
    }
  }
}
