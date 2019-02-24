import {rect} from '@render-props/rect'
import centerFromTop from './centerFromTop'
import centerFromBottom from './centerFromBottom'
import centerFromLeft from './centerFromLeft'
import centerFromRight from './centerFromRight'


export default function (direction, container, popOverBox, viewportSize) {
  const containerRect = rect(container)
  const boxRect = rect(popOverBox)

  if (!containerRect) {
    return null
  }

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

  state.hasRendered = true
  return state
}