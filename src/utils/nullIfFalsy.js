export default fn => (v, t, p) =>
  v === false || v === null ? null : fn(v, t, p)
