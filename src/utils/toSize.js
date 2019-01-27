export default function toSize (value) {
  if (isNaN(value)) {
    return value
  } else {
    return `${value}px`
  }
}
