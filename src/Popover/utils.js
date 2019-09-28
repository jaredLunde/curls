const centerXPos = (triggerRect, popoverRect, containIn) => ({
  left: 'auto',
  right:
    containIn.right -
    triggerRect.right -
    (popoverRect.width - triggerRect.width) / 2,
})

const centerYPos = (triggerRect, popoverRect, containIn) => ({
  top: 'auto',
  bottom:
    containIn.bottom -
    triggerRect.bottom -
    (popoverRect.height - triggerRect.height) / 2,
})

const startXInnerPos = triggerRect => ({
  left: triggerRect.left,
  right: 'auto',
})

const startXOuterPos = (triggerRect, boxSize, containIn) => ({
  left: 'auto',
  right: containIn.right - triggerRect.left,
})

const endXOuterPos = triggerRect => ({
  left: triggerRect.right,
  right: 'auto',
})

const endXInnerPos = (triggerRect, boxSize, containIn) => {
  return {
    left: 'auto',
    right: containIn.right - triggerRect.right,
  }
}

const startYInnerPos = triggerRect => ({
  top: triggerRect.top,
  bottom: 'auto',
})

const startYOuterPos = (triggerRect, boxSize, containIn) => ({
  top: 'auto',
  bottom: containIn.bottom - triggerRect.top,
})

const endYInnerPos = (triggerRect, boxSize, containIn) => ({
  top: 'auto',
  bottom: containIn.bottom - triggerRect.bottom,
})

const endYOuterPos = triggerRect => ({
  top: triggerRect.bottom,
  bottom: 'auto',
})

const centerXRect = (triggerRect, popoverRect) => {
  const rect = {
    right: popoverRect.width / 2 - triggerRect.width / 2 + triggerRect.right,
  }
  rect.left = rect.right - popoverRect.width
  return rect
}

const startXOuterRect = (triggerRect, popoverRect) => {
  const rect = {right: triggerRect.left}
  rect.left = rect.right - popoverRect.width
  return rect
}

const endXOuterRect = (triggerRect, popoverRect) => {
  const rect = {left: triggerRect.right}
  rect.right = rect.left + popoverRect.width
  return rect
}

const centerYRect = (triggerRect, popoverRect) => {
  const rect = {
    bottom:
      popoverRect.height / 2 - triggerRect.height / 2 + triggerRect.bottom,
  }
  rect.top = rect.bottom - popoverRect.height
  return rect
}

const startYOuterRect = (triggerRect, popoverRect) => {
  const rect = {bottom: triggerRect.top}
  rect.top = rect.bottom - popoverRect.height
  return rect
}

const endYOuterRect = (triggerRect, popoverRect) => {
  const rect = {top: triggerRect.bottom}
  rect.bottom = rect.top + popoverRect.height
  return rect
}

const startXInnerRect = (triggerRect, popoverRect) => {
  const rect = {left: triggerRect.left}
  rect.right = rect.left + popoverRect.width
  return rect
}

const endXInnerRect = (triggerRect, popoverRect) => {
  const rect = {right: triggerRect.right}
  rect.left = rect.right - popoverRect.width
  return rect
}

const startYInnerRect = (triggerRect, popoverRect) => {
  const rect = {top: triggerRect.top}
  rect.bottom = rect.top + popoverRect.height
  return rect
}

const endYInnerRect = (triggerRect, popoverRect) => {
  const rect = {bottom: triggerRect.bottom}
  rect.top = rect.bottom - popoverRect.height
  return rect
}

const calcIdealRect = (placement, triggerRect, popoverRect) => {
  switch (placement) {
    case 'top':
      return Object.assign(
        centerXRect(triggerRect, popoverRect),
        startYOuterRect(triggerRect, popoverRect)
      )

    case 'topleft':
      return Object.assign(
        startXInnerRect(triggerRect, popoverRect),
        startYOuterRect(triggerRect, popoverRect)
      )

    case 'topright':
      return Object.assign(
        endXInnerRect(triggerRect, popoverRect),
        startYOuterRect(triggerRect, popoverRect)
      )

    case 'right':
      return Object.assign(
        endXOuterRect(triggerRect, popoverRect),
        centerYRect(triggerRect, popoverRect)
      )

    case 'righttop':
      return Object.assign(
        endXOuterRect(triggerRect, popoverRect),
        startYInnerRect(triggerRect, popoverRect)
      )

    case 'rightbottom':
      return Object.assign(
        endXOuterRect(triggerRect, popoverRect),
        endYInnerRect(triggerRect, popoverRect)
      )

    case 'bottom':
      return Object.assign(
        centerXRect(triggerRect, popoverRect),
        endYOuterRect(triggerRect, popoverRect)
      )

    case 'bottomleft':
      return Object.assign(
        startXInnerRect(triggerRect, popoverRect),
        endYOuterRect(triggerRect, popoverRect)
      )

    case 'bottomright':
      return Object.assign(
        endXInnerRect(triggerRect, popoverRect),
        endYOuterRect(triggerRect, popoverRect)
      )

    case 'left':
      return Object.assign(
        startXOuterRect(triggerRect, popoverRect),
        centerYRect(triggerRect, popoverRect)
      )

    case 'lefttop':
      return Object.assign(
        startXOuterRect(triggerRect, popoverRect),
        startYInnerRect(triggerRect, popoverRect)
      )

    case 'leftbottom':
      return Object.assign(
        startXOuterRect(triggerRect, popoverRect),
        endYInnerRect(triggerRect, popoverRect)
      )

    case 'innerleft':
      return Object.assign(
        startXInnerRect(triggerRect, popoverRect),
        centerYRect(triggerRect, popoverRect)
      )

    case 'innerright':
      return Object.assign(
        endXInnerRect(triggerRect, popoverRect),
        centerYRect(triggerRect, popoverRect)
      )

    case 'innertop':
      return Object.assign(
        centerXRect(triggerRect, popoverRect),
        startYInnerRect(triggerRect, popoverRect)
      )

    case 'innertopleft':
      return Object.assign(
        startXInnerRect(triggerRect, popoverRect),
        startYInnerRect(triggerRect, popoverRect)
      )

    case 'innertopright':
      return Object.assign(
        endXInnerRect(triggerRect, popoverRect),
        startYInnerRect(triggerRect, popoverRect)
      )

    case 'innerbottom':
      return Object.assign(
        centerXRect(triggerRect, popoverRect),
        endYInnerRect(triggerRect, popoverRect)
      )

    case 'innerbottomleft':
      return Object.assign(
        startXInnerRect(triggerRect, popoverRect),
        endYInnerRect(triggerRect, popoverRect)
      )

    case 'innerbottomright':
      return Object.assign(
        endXInnerRect(triggerRect, popoverRect),
        endYInnerRect(triggerRect, popoverRect)
      )

    default:
      return Object.assign(
        centerXRect(triggerRect, popoverRect),
        centerYRect(triggerRect, popoverRect)
      )
  }
}

const contain = placement => (
  triggerRect,
  popoverRect,
  containIn,
  containStrategy
) => {
  const flip = containStrategy === 'flip',
    flipX = containStrategy === 'flipX',
    flipY = containStrategy === 'flipY'

  if (flip || flipX || flipY) {
    const idealRect = calcIdealRect(placement, triggerRect, popoverRect)

    // center checks
    if (!placement) {
      if (flip || flipY) {
        if (idealRect.bottom > containIn.bottom) {
          placement = 'top'
        } else if (idealRect.top < containIn.top) {
          placement = 'bottom'
        }
      }

      if (!placement && (flip || flipX)) {
        if (idealRect.left < containIn.left) {
          placement = 'right'
        } else if (idealRect.right > containIn.right) {
          placement = 'left'
        }
      }
    }
    // order of these indexes matters... must be before placement === top check
    const leftIdx = placement.indexOf('left'),
      topIdx = placement.indexOf('top')

    if (placement === 'top' || placement === 'bottom') {
      if (flip || flipX) {
        // handles center X-axis case
        if (idealRect.left < containIn.left) {
          placement += 'left'
        } else if (idealRect.right > containIn.right) {
          placement += 'right'
        }
      }
    }

    if (flip || flipX) {
      // left checks
      if (
        (leftIdx === 0 && idealRect.left < containIn.left) ||
        (leftIdx > 0 && idealRect.right > containIn.right)
      ) {
        placement = placement.replace('left', 'right')
      } else {
        const rightIdx = placement.indexOf('right')
        // right checks
        if (
          (rightIdx === 0 && idealRect.right > containIn.right) ||
          (rightIdx > 0 && idealRect.left < containIn.left)
        ) {
          placement = placement.replace('right', 'left')
        }
      }
    }

    // handles center Y-axis case
    if (flip || flipY) {
      if (placement === 'left' || placement === 'right') {
        if (idealRect.top < containIn.top) {
          placement += 'top'
        } else if (idealRect.bottom > containIn.bottom) {
          placement += 'bottom'
        }
      } else if (placement === 'innerleft' || placement === 'innerright') {
        if (idealRect.top < containIn.top) {
          placement = placement.replace('inner', 'innertop')
        } else if (idealRect.bottom > containIn.bottom) {
          placement = placement.replace('inner', 'innerbottom')
        }
      }
    }

    if (flip || flipY) {
      // top checks
      if (
        (topIdx === 0 && idealRect.top < containIn.top) ||
        (topIdx > 0 && idealRect.bottom > containIn.bottom)
      ) {
        placement = placement.replace('top', 'bottom')
      } else {
        const bottomIdx = placement.indexOf('bottom')
        // bottom checks
        if (
          (bottomIdx === 0 && idealRect.bottom > containIn.bottom) ||
          (bottomIdx > 0 && idealRect.top < containIn.top)
        ) {
          placement = placement.replace('bottom', 'top')
        }
      }
    }
  } else if (typeof containStrategy === 'function') {
    placement = contain(triggerRect, popoverRect, containIn)

    if (typeof placement !== 'string') return placement
  }

  return calcPlacement(placement, triggerRect, popoverRect, containIn)
}

const calcPlacement = (placement, triggerRect, popoverRect, containIn) => {
  switch (placement) {
    case 'top':
      return {
        placement: 'top',
        style: Object.assign(
          centerXPos(triggerRect, popoverRect, containIn),
          startYOuterPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'topleft':
      return {
        placement: 'topLeft',
        style: Object.assign(
          startYOuterPos(triggerRect, popoverRect, containIn),
          startXInnerPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'topright':
      return {
        placement: 'topRight',
        style: Object.assign(
          startYOuterPos(triggerRect, popoverRect, containIn),
          endXInnerPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'right':
      return {
        placement: 'right',
        style: Object.assign(
          endXOuterPos(triggerRect, popoverRect, containIn),
          centerYPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'righttop':
      return {
        placement: 'rightTop',
        style: Object.assign(
          endXOuterPos(triggerRect, popoverRect, containIn),
          startYInnerPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'rightbottom':
      return {
        placement: 'rightBottom',
        style: Object.assign(
          endXOuterPos(triggerRect, popoverRect, containIn),
          endYInnerPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'bottom':
      return {
        placement: 'bottom',
        style: Object.assign(
          centerXPos(triggerRect, popoverRect, containIn),
          endYOuterPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'bottomleft':
      return {
        placement: 'bottomLeft',
        style: Object.assign(
          startXInnerPos(triggerRect, popoverRect, containIn),
          endYOuterPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'bottomright':
      return {
        placement: 'bottomRight',
        style: Object.assign(
          endXInnerPos(triggerRect, popoverRect, containIn),
          endYOuterPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'left':
      return {
        placement: 'left',
        style: Object.assign(
          startXOuterPos(triggerRect, popoverRect, containIn),
          centerYPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'lefttop':
      return {
        placement: 'leftTop',
        style: Object.assign(
          startXOuterPos(triggerRect, popoverRect, containIn),
          startYInnerPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'leftbottom':
      return {
        placement: 'leftBottom',
        style: Object.assign(
          startXOuterPos(triggerRect, popoverRect, containIn),
          endYInnerPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'innertop':
      return {
        placement: 'innerTop',
        style: Object.assign(
          centerXPos(triggerRect, popoverRect, containIn),
          startYInnerPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'innertopleft':
      return {
        placement: 'innerTopLeft',
        style: Object.assign(
          startXInnerPos(triggerRect, popoverRect, containIn),
          startYInnerPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'innertopright':
      return {
        placement: 'innerTopRight',
        style: Object.assign(
          endXInnerPos(triggerRect, popoverRect, containIn),
          startYInnerPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'innerright':
      return {
        placement: 'innerRight',
        style: Object.assign(
          endXInnerPos(triggerRect, popoverRect, containIn),
          centerYPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'innerbottom':
      return {
        placement: 'innerBottom',
        style: Object.assign(
          centerXPos(triggerRect, popoverRect, containIn),
          endYInnerPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'innerbottomright':
      return {
        placement: 'innerBottomRight',
        style: Object.assign(
          endXInnerPos(triggerRect, popoverRect, containIn),
          endYInnerPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'innerbottomleft':
      return {
        placement: 'innerBottomLeft',
        style: Object.assign(
          startXInnerPos(triggerRect, popoverRect, containIn),
          endYInnerPos(triggerRect, popoverRect, containIn)
        ),
      }

    case 'innerleft':
      return {
        placement: 'innerLeft',
        style: Object.assign(
          startXInnerPos(triggerRect, popoverRect, containIn),
          centerYPos(triggerRect, popoverRect, containIn)
        ),
      }

    default:
      return {
        placement: 'center',
        style: Object.assign(
          centerXPos(triggerRect, popoverRect, containIn),
          centerYPos(triggerRect, popoverRect, containIn)
        ),
      }
  }
}

const defaultPlacements = /outer|center/g

export const setPlacementStyle = (
  requestedPlacement,
  trigger,
  popover,
  containIn,
  containStrategy
) => {
  if (!trigger || !popover) return requestedPlacement

  if (typeof window !== 'undefined' && containIn === window) {
    containIn = document.documentElement
  }
  let result = {},
    placement = requestedPlacement
  const triggerRect = trigger.getBoundingClientRect(),
    popoverRect = popover.getBoundingClientRect()

  containIn = {
    width: containIn.offsetWidth,
    height: containIn.offsetHeight,
    top: containIn.offsetTop,
    right: containIn.offsetWidth,
    bottom: containIn.offsetHeight,
    left: containIn.offsetLeft,
  }

  popoverRect.width = popover.offsetWidth
  popoverRect.height = popover.offsetHeight

  if (typeof placement === 'function') {
    result = requestedPlacement(
      triggerRect,
      popoverRect,
      containIn,
      containStrategy
    )

    if (typeof result === 'string') {
      placement = result
    } else {
      if (__DEV__) {
        if (
          typeof result.placement !== 'string' ||
          typeof result.style !== 'object'
        ) {
          throw new Error(
            `[Popover] Placement functions must return an object of type:\n` +
              `\n{\n  placement: string,\n  style: {}\n}\n`
          )
        }
      }
    }
  }

  if (typeof placement === 'string') {
    const fn = contain(placement.toLowerCase().replace(defaultPlacements, ''))
    result = fn(triggerRect, popoverRect, containIn, containStrategy)
  }

  result.requestedPlacement = requestedPlacement
  return result
}
