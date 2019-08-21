import centerFromTop from './centerFromTop'
import centerFromBottom from './centerFromBottom'
import centerFromLeft from './centerFromLeft'
import centerFromRight from './centerFromRight'

export default function(direction, container, popoverBox, viewportSize) {
  const containerRect = container && container.getBoundingClientRect(),
    boxRect = popoverBox && popoverBox.getBoundingClientRect()

  if (!containerRect) return null
  let state

  switch (direction) {
    case 'fromTop':
      state = centerFromTop(containerRect, boxRect, viewportSize)
      break
    case 'fromRight':
      state = centerFromRight(containerRect, boxRect, viewportSize)
      break
    case 'fromBottom':
      state = centerFromBottom(containerRect, boxRect, viewportSize)
      break
    case 'fromLeft':
      state = centerFromLeft(containerRect, boxRect, viewportSize)
      break
  }

  return state
}
