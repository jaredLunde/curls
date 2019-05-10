import centerY from './centerY'


export default (containerRect, boxRect, {width, height}) => {
  let left = 'auto', right = 'auto', renderPosition = 'right'

  if (containerRect.right + boxRect.width < width) {
    left = containerRect.right
  } else if (containerRect.left - ((boxRect.width - containerRect.width) / 2) > -1) {
    left = containerRect.left - boxRect.width
    renderPosition = 'left'
  } else {
    right = 0
  }

  return Object.assign({left, right, renderPosition}, centerY(containerRect, boxRect, height))
}