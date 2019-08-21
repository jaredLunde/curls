export default (containerRect, boxRect, width) => {
  let right = 'auto',
    left = containerRect.left + (containerRect.width - boxRect.width) / 2
  const boxWidth = (boxRect.width - containerRect.width) / 2,
    doesNotFitLeft =
      left < containerRect.left && containerRect.left - boxWidth < 0,
    doesNotFitRight = containerRect.right + boxWidth > width

  if (doesNotFitLeft && !doesNotFitRight) {
    left = containerRect.left
  } else if (doesNotFitRight && !doesNotFitLeft) {
    left = 'auto'
    right = 0
  } else if (doesNotFitRight && doesNotFitLeft) {
    left = (width - boxRect.width) / 2
  }

  return {left, right}
}
