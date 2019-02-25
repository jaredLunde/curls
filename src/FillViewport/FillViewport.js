import {ViewportSize} from '@render-props/viewport'


const FillViewport = initialProps => {
  let {children, style, height} = initialProps
  style = style || {height: isNaN(height) ? '100vh' : height}
  return children({style})
}

export default props => ViewportSize({
  children: function (context) {
    return FillViewport({
      height: context.height,
      children: props.children
    })
  }
})