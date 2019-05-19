import {jsx} from '@emotion/core'
import useStyles from './useStyles'
import {objectWithoutProps} from './utils'


const
  withoutElementProps = {as: 0, innerRef: 0},
  withoutChildren = {children: 0}

export const renderNode = (nodeProps, defaultCSS) => {
  if (defaultCSS !== void 0)
    nodeProps.css = nodeProps.css !== void 0 ? [defaultCSS, nodeProps.css] : defaultCSS
  // TODO: remove this
  if (nodeProps.innerRef !== void 0)
    nodeProps.ref = nodeProps.innerRef
  return jsx(nodeProps.as || 'div', objectWithoutProps(nodeProps, withoutElementProps))
}

export const renderNodeFast = nodeProps => {
  // TODO: remove this
  if (nodeProps.innerRef !== void 0)
    nodeProps.ref = nodeProps.innerRef
  return jsx(nodeProps.as || 'div', objectWithoutProps(nodeProps, withoutElementProps))
}

export default options => props => {
  const styleProps = useStyles(props, options)
  return props.children(objectWithoutProps(styleProps, withoutChildren))
}