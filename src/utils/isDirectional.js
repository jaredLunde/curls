export default function isDirectional (value) {
  return typeof value === 'string' && value.length > 1
}
