import centerX from './centerX'


export default function (containerRect, boxRect, {width, height}) {
  let top = 'auto'
  let bottom = 'auto'

  if (containerRect.top - boxRect.height > -1) {
    top = containerRect.top - boxRect.height
  } else if (containerRect.bottom + ((boxRect.height - containerRect.height) / 2) < height) {
    top = containerRect.bottom
  } else {
    // top = containerRect.top + ((containerRect.height - boxRect.height) / 2)
    top = 0
  }

  const X = centerX(containerRect, boxRect, width)
  return {top, bottom, ...X}
}
