import getTrimmedPx from './getTrimmedPx'


export default function (val, trimmed) {
  return (
    typeof val === 'string'
    ? '100vh'
    : val - (getTrimmedPx(trimmed) || 0)
  )
}
