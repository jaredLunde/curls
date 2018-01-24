import ViewportSize from 'react-cake/es/Viewport/ViewportSize'
import reduceProps from 'react-cake/es/utils/reduceProps'
import viewport from '../PropTypes/viewport'


function FillViewport (initialProps) {
  let {children, style, viewportHeight, ...props} = initialProps
  props = reduceProps(props, viewport)

  return children({
    style: {
      ...style,
      height: isNaN(viewportHeight) ? '100vh' : viewportHeight
    },
    ...props
  })
}


export default function ({children, ...props}) {
  return ViewportSize({
    ...props,
    children: function (fillViewportProps) {
      fillViewportProps.children = children
      return FillViewport(fillViewportProps)
    }
  })
}
