export default function getTrimmedPx (trimmed) {
  if (!trimmed) {
    return
  }

  let trimmedPx = 0

  switch (typeof trimmed) {
    case 'number':
    case 'string':
      trimmedPx = trimmed
      break;
    case 'object':
      // Assumes document element
      if (Array.isArray(trimmed)) {
        for (let item of trimmed) {
          trimmedPx += getTrimmedPx(item)
        }
      } else {
        trimmedPx = trimmed.offsetHeight
      }
      break;
    case 'function':
      trimmedPx = trimmed()
      break;
  }

  return trimmedPx
}
