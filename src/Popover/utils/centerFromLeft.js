import centerY from './centerY'

export default (containerRect, boxRect, {width, height}) => {
  let left = 'auto',
    right = 'auto',
    renderPosition = 'left'

  if (containerRect.left - boxRect.width > -1) {
    left = containerRect.left - boxRect.width
  } else if (
    containerRect.right + (boxRect.width - containerRect.width) / 2 <
    width
  ) {
    left = containerRect.right
    renderPosition = 'right'
  } else {
    left = 0
  }

  return Object.assign(
    {left, right, renderPosition},
    centerY(containerRect, boxRect, height)
  )
}
