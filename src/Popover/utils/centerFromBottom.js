import centerX from './centerX'


export default function (containerRect, boxRect, {width, height}) {
  let top = 'auto'
  let bottom = 'auto'
  let renderPosition = 'bottom'

  if (containerRect.bottom + boxRect.height < height) {
    top = containerRect.bottom
  } else if (containerRect.top - ((boxRect.height - containerRect.height) / 2) > -1) {
    top = containerRect.top - boxRect.height
    renderPosition = 'top'
  } else {
    bottom = 0
  }

  const X = centerX(containerRect, boxRect, width)
  return {top, bottom, renderPosition, ...X}
}
