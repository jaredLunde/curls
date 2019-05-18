import useWindowSize from '@react-hook/window-size'


export default props => {
  const
    [_, height] = useWindowSize(0, 0),
    style = props.style || {height: isNaN(height) ? '100vh' : height}
  return children({style})
}