export default (props, defaultStyles) => {
  const defaultStylesIsArray = Array.isArray(defaultStyles)

  if (Array.isArray(props.css)) {
    if (defaultStylesIsArray)
      props.css.push.apply(props.css, defaultStyles)
    else
      props.css.push(defaultStyles)
  } else if (typeof props.css === 'object' && props.css !== null) {
    if (defaultStylesIsArray)
      props.css = [props.css].concat(defaultStyles)
    else
      props.css = [props.css, defaultStyles]
  }
  else {
    props.css = defaultStylesIsArray ? defaultStyles.slice(0) : [defaultStyles]
  }

  return props
}