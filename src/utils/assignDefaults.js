export default function(objA, objB) {
  let out = {},
    keysA = Object.keys(objA),
    i = 0
  for (; i < keysA.length; i++)
    if (objB[keysA[i]] === void 0) out[keysA[i]] = objA[keysA[i]]
  return Object.assign(out, objB)
}
