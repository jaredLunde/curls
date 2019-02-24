export default function getDelay (value, props) {
  return (
    value === true
    ? props.enterDelay !== void 0
      ? props.enterDelay
      : props.delay
    : props.leaveDelay !== void 0
      ? props.leaveDelay
      : props.delay
  )
}
