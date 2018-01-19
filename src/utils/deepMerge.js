import isMergeableObject from 'is-mergeable-object'


function mergeIfMergeable (value) {
	return (
    isMergeableObject(value)
		? deepMerge(Array.isArray(value) ? [] : {}, value)
		: value
  )
}

function arrayMergeReplace (target, source) {
  if (target === source) {
    return target
  }

  const output = []

  for (let x = 0; x < source.length; x++) {
    output.push(mergeIfMergeable(source[x]))
  }

  return output
}


function mergeObject (target, source) {
  if (target === source) {
    return target
  }

	var destination = {...target}
  const sourceKeys = Object.keys(source)

  for (let x = 0; x < sourceKeys.length; x++) {
    const key = sourceKeys[x]

    if (!isMergeableObject(source[key]) || target[key] === void 0) {
			destination[key] = mergeIfMergeable(source[key])
		}
    else {
			destination[key] = deepMerge(target[key], source[key])
		}
  }

	return destination
}


export default function deepMerge (target, source) {
	const sourceIsArray = Array.isArray(source)
	const targetIsArray = Array.isArray(target)
	const sourceAndTargetTypesMatch = sourceIsArray === targetIsArray

	if (!sourceAndTargetTypesMatch) {
		return mergeIfMergeable(source)
	}
  else if (sourceIsArray) {
		const arrayMerge = arrayMergeReplace
		return arrayMergeReplace(target, source)
	}
  else {
		return mergeObject(target, source)
	}
}
