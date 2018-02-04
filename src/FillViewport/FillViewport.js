import ViewportSize from 'react-cake/es/Viewport/ViewportSize'
import reduceProps from 'react-cake/es/utils/reduceProps'
import viewport from '../PropTypes/viewport'


function FillViewport (initialProps) {
  let {children, style, viewportHeight} = initialProps

  return children({
    style: {
      ...style,
      height: isNaN(viewportHeight) ? '100vh' : viewportHeight
    }
  })
}


export default function (props) {
  return ViewportSize({
    withCoords: true,
    children: function (fillViewportProps) {
      fillViewportProps.children = props.children
      return FillViewport(fillViewportProps)
    }
  })
}
