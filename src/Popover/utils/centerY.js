export default function (containerRect, boxRect, height) {
  let bottom = 'auto'
  let top = containerRect.top + ((containerRect.height - boxRect.height) / 2)
  const boxHeight = ((boxRect.height - containerRect.height) / 2)
  const doesNotFitTop = top < containerRect.top && (containerRect.top - boxHeight < 0)
  const doesNotFitBottom = containerRect.bottom + boxHeight > height

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
