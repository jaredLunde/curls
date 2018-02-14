export default function (objectA, objectB) {
  const output = {}
  const objectAKeys = Object.keys(objectA)

  for (let x = 0; x < objectAKeys.length; x++) {
    const key = objectAKeys[x]
    if (objectB[key] === void 0) {
      output[key] = objectA[key]
    }
  }

  const objectBKeys = Object.keys(objectB)

  for (let x = 0; x < objectBKeys.length; x++) {
    const key = objectBKeys[x]
    output[key] = objectB[key]
  }

  return output
}
