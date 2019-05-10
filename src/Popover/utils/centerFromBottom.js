import centerX from './centerX'


export default (containerRect, boxRect, {width, height}) => {
  let top = 'auto', bottom = 'auto', renderPosition = 'bottom'

  if (containerRect.bottom + boxRect.height < height) {
    top = containerRect.bottom
  } else if (containerRect.top - ((boxRect.height - containerRect.height) / 2) > -1) {
    top = containerRect.top - boxRect.height
    renderPosition = 'top'
  } else {
    bottom = 0
  }

  return Object.assign({top, bottom, renderPosition}, centerX(containerRect, boxRect, width))
}