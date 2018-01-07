import centerY from './centerY'


export default function (containerRect, boxRect, {width, height}) {
  let left = 'auto'
  let right = 'auto'

  if (containerRect.right + boxRect.width < width) {
    left = containerRect.right
  } else if (containerRect.left - ((boxRect.width - containerRect.width) / 2) > -1) {
    left = containerRect.left - boxRect.width
  } else {
    right = 0
  }

  const Y = centerY(containerRect, boxRect, height)
  return {left, right, ...Y}
}
