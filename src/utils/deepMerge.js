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
  if (target === source) return target

  let output = [], i = 0
  for (; i < source.length; i++)
    output.push(mergeIfMergeable(source[i]))

  return output
}

const mergeObject = (target, source) => {
  if (target === source) return target

	let
    destination = Object.assign({}, target),
    sourceKeys = Object.keys(source),
    i = 0

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
  const
    sourceIsArray = Array.isArray(source),
    targetIsArray = Array.isArray(target),
    sourceAndTargetTypesMatch = sourceIsArray === targetIsArray

  return sourceAndTargetTypesMatch === false
    ? mergeIfMergeable(source)
    : sourceIsArray === true
      ? arrayMergeReplace(target, source)
      : mergeObject(target, source)
}

export default deepMerge