export default function assignOrdered (objectA, objectB) {
  let objectAKeys = Object.keys(objectA),
      output = {},
      i = 0

  for (; i < objectAKeys.length; i++) {
    const key = objectAKeys[i]
    if (objectB[key] === void 0) {
      output[key] = objectA[key]
    }
  }

  const objectBKeys = Object.keys(objectB)

  for (i = 0; i < objectBKeys.length; i++) {
    const key = objectBKeys[i]
    output[key] = objectB[key]
  }

  return output
}
