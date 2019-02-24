// Adapted from: https://github.com/TehShrike/deepmerge
//
// Copyright Nick Fisher
// License MIT
import isMergeableObject from 'is-mergeable-object'


const mergeIfMergeable = value => {
	return (
    isMergeableObject(value)
      ? deepMerge(Array.isArray(value) ? [] : {}, value)
      : value
  )
}

const arrayMergeReplace = (target, source) => {
  if (target === source) {
    return target
  }

  const output = []
  let i = 0

  for (; i < source.length; i++) {
    output.push(mergeIfMergeable(source[i]))
  }

  return output
}

const mergeObject = (target, source) => {
  if (target === source) {
    return target
  }

	const destination = Object.assign({}, target)
  const sourceKeys = Object.keys(source)
  let i = 0

  for (; i < sourceKeys.length; i++) {
    const key = sourceKeys[i]

    if (isMergeableObject(source[key]) === false || target[key] === void 0) {
			destination[key] = mergeIfMergeable(source[key])
		}
    else {
			destination[key] = deepMerge(target[key], source[key])
		}
  }

	return destination
}

const deepMerge = (target, source) => {
  const sourceIsArray = Array.isArray(source)
  const targetIsArray = Array.isArray(target)
  const sourceAndTargetTypesMatch = sourceIsArray === targetIsArray

  if (!sourceAndTargetTypesMatch) {
    return mergeIfMergeable(source)
  }
  else if (sourceIsArray) {
    return arrayMergeReplace(target, source)
  }
  else {
    return mergeObject(target, source)
  }
}

export default deepMerge