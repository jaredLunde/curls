export default function (name, value, {CSS, theme, ...props}) {
  const css = CSS[name]
  return (
    typeof css === 'string'
    ? css
    : typeof css === 'function'
      ? css(value, theme, props)
      : css[value]
  )
}
