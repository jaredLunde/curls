export default (containerRect, boxRect, height) => {
  let
    bottom = 'auto',
    top = containerRect.top + ((containerRect.height - boxRect.height) / 2)
  const
    boxHeight = ((boxRect.height - containerRect.height) / 2),
    doesNotFitTop = top < containerRect.top && (containerRect.top - boxHeight < 0),
    doesNotFitBottom = containerRect.bottom + boxHeight > height

  if (doesNotFitTop && !doesNotFitBottom) {
    top = 0
  } else if (doesNotFitBottom && !doesNotFitTop) {
    top = 'auto'
    bottom = 0
  } else if (doesNotFitBottom && doesNotFitTop) {
    top = ((height - boxRect.height) / 2)
  }

  return {top, bottom}
}