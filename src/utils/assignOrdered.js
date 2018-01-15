export default function (objectA, objectB) {
  if (typeof objectB !== 'object' || objectB === null) {
    return objectA
  }
  else if (typeof objectA !== 'object' || objectA === null) {
    return objectB
  }

  const output = {}
  const objectAKeys = Object.keys(objectA)
  const objectBKeys = Object.keys(objectB)

  for (let x = 0; x < objectAKeys.length; x++) {
    const key = objectAKeys[x]
    // maybe switch to hasownproperty but really do not want to
    if (objectB[key] === void 0) {
      output[key] = objectA[key]
    }
  }

  for (let x = 0; x < objectBKeys.length; x++) {
    const key = objectBKeys[x]
    output[key] = objectB[key]
  }

  return output
}
