export default fn => (v, t, p) => v === false ? null : fn(v, t, p)

