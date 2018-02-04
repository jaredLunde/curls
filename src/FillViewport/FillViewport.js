import WithViewport from 'react-cake/es/Viewport/WithViewport'


function FillViewport (initialProps) {
  const {children, style, height} = initialProps

  return children({
    style: {
      ...style,
      height: isNaN(height) ? '100vh' : height
    }
  })
}


export default function (props) {
  return WithViewport({
    children: function (vpContext) {
      return FillViewport({
        ...vpContext.getViewportSize(),
        children: props.children
      })
    }
  })
}
