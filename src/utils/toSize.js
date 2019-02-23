export default (value, unit = 'px') => isNaN(value) ? value : `${value}${unit}`
