import rect from '@render-props/rect/es/utils/rect'
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

  switch (direction) {
    case 'fromTop':
      return centerFromTop(containerRect, boxRect, viewportSize)
    case 'fromRight':
      return centerFromRight(containerRect, boxRect, viewportSize)
    case 'fromBottom':
      return centerFromBottom(containerRect, boxRect, viewportSize)
    case 'fromLeft':
      return centerFromLeft(containerRect, boxRect, viewportSize)
  }
}
