import centerX from './centerX'


export default (containerRect, boxRect, {width, height}) => {
  let top = 'auto', bottom = 'auto', renderPosition = 'top'

  if (containerRect.top - boxRect.height > -1) {
    top = containerRect.top - boxRect.height
  } else if (containerRect.bottom + ((boxRect.height - containerRect.height) / 2) < height) {
    top = containerRect.bottom
    renderPosition = 'bottom'
  } else {
    top = 0
  }

  return Object.assign({top, bottom, renderPosition}, centerX(containerRect, boxRect, width))
}