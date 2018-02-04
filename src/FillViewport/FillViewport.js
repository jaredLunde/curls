import ViewportConsumer from 'react-cake/es/Viewport/ViewportConsumer'


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
  return ViewportConsumer({
    children: function (context) {
      return FillViewport({
        height: context.height,
        children: props.children
      })
    }
  })
}
