import centerY from './centerY'


export default function (containerRect, boxRect, {width, height}) {
  let left = 'auto'
  let right = 'auto'

  if (containerRect.left - boxRect.width > -1) {
    left = containerRect.left - boxRect.width
  } else if (containerRect.right + boxRect.width < width) {
    left = containerRect.right
  } else {
    // left = containerRect.left + ((containerRect.width - boxRect.width) / 2)
    left = 0
  }

  const Y = centerY(containerRect, boxRect, height)
  return {left, right, ...Y}
}
