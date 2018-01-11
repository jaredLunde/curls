export default function (value) {
  if (isNaN(value)) {
    return value
  } else {
    return `${value}px`
  }
}
