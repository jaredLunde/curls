export default (value, unit = 'px') => isNaN(value) === true ? value : `${value}${unit}`
