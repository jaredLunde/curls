export default function (objectA, objectB) {
  const output = {}
  const objectAKeys = Object.getOwnPropertyNames(objectA)

  for (let x = 0; x < objectAKeys.length; x++) {
    const key = objectAKeys[x]
    // maybe switch to hasownproperty but really do not want to
    if (objectB[key] === void 0) {
      output[key] = objectA[key]
    }
  }

  const objectBKeys = Object.getOwnPropertyNames(objectB)

  for (let x = 0; x < objectBKeys.length; x++) {
    const key = objectBKeys[x]
    output[key] = objectB[key]
  }

  return output
}
