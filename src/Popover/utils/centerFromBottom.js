import centerX from './centerX'


export default function (containerRect, boxRect, {width, height}) {
  let top = 'auto'
  let bottom = 'auto'

  if (containerRect.bottom + boxRect.height < height) {
    top = containerRect.bottom
  } else if (containerRect.top - boxRect.height > -1) {
    top = containerRect.top - boxRect.height
  } else {
    // top = containerRect.top + ((containerRect.height - boxRect.height) / 2)
    bottom = 0
  }

  const X = centerX(containerRect, boxRect, width)
  return {top, bottom, ...X}
}
