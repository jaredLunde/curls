export default function supportsCSS (style) {
  return typeof document !== 'undefined' && style in document.body.style
}
