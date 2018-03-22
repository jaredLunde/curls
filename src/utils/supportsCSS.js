export default function (style) {
  return typeof document !== 'undefined' && style in document.body.style
}
