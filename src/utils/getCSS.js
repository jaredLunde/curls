export default function (name, value, {CSS, theme}) {
  const css = CSS[name]
  return (
    typeof css === 'string'
    ? css
    : typeof css === 'function'
      ? css(value, theme)
      : css[value]
  )
}
