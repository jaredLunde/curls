import {ViewportConsumer} from '@render-props/viewport'


function FillViewport (initialProps) {
  let {children, style, height} = initialProps
  style = style || {height: isNaN(height) ? '100vh' : height}
  return children({style})
}


export default function (props) {
  return ViewportConsumer({
    observe: 'height',
    children: function (context) {
      return FillViewport({
        height: context.height,
        children: props.children
      })
    }
  })
}
