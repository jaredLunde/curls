const centerX = (triggerRect, popoverRect, constrainTo) => ({
  left: 'auto',
  right:
    constrainTo.width -
    triggerRect.right -
    (popoverRect.width - triggerRect.width) / 2,
})

const centerY = (triggerRect, popoverRect, constrainTo) => ({
  top: 'auto',
  bottom:
    constrainTo.height -
    triggerRect.bottom -
    (popoverRect.height - triggerRect.height) / 2,
})

const startXinnerEdge = triggerRect => ({
  left: triggerRect.left,
  right: 'auto',
})

const startXouterEdge = (triggerRect, boxSize, constrainTo) => ({
  left: 'auto',
  right: constrainTo.width - triggerRect.left,
})

const endXouterEdge = triggerRect => ({
  left: triggerRect.right,
  right: 'auto',
})

const endXinnerEdge = (triggerRect, boxSize, constrainTo) => {
  return {
    left: 'auto',
    right: constrainTo.width - triggerRect.right,
  }
}

const startYinnerEdge = triggerRect => ({
  top: triggerRect.top,
  bottom: 'auto',
})

const startYouterEdge = (triggerRect, boxSize, constrainTo) => ({
  top: 'auto',
  bottom: constrainTo.height - triggerRect.top,
})

const endYinnerEdge = (triggerRect, boxSize, constrainTo) => ({
  top: 'auto',
  bottom: constrainTo.height - triggerRect.bottom,
})

const endYouterEdge = triggerRect => ({
  top: triggerRect.bottom,
  bottom: 'auto',
})

const constrain = placement => (
  triggerRect,
  popoverRect,
  constrainTo,
  constrainStrategy
) => {
  const flip = constrainStrategy === 'flip',
    flipX = constrainStrategy === 'flipX',
    flipY = constrainStrategy === 'flipY'

  if (flip || flipX || flipY) {
    // center checks
    if (!placement) {
      if (flip || flipY) {
        if (popoverRect.bottom > constrainTo.bottom) {
          placement = 'top'
        } else if (popoverRect.top < constrainTo.top) {
          placement = 'bottom'
        }
      }

      if (!placement && (flip || flipX)) {
        if (popoverRect.left < constrainTo.left) {
          placement = 'right'
        } else if (popoverRect.right > constrainTo.right) {
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
        if (popoverRect.left < constrainTo.left) {
          placement += 'left'
        } else if (popoverRect.right > constrainTo.right) {
          placement += 'right'
        }
      }
    }

    if (flip || flipX) {
      // left checks
      if (
        (leftIdx === 0 && popoverRect.left < constrainTo.left) ||
        (leftIdx > 0 && popoverRect.right > constrainTo.right)
      ) {
        placement = placement.replace('left', 'right')
      } else {
        const rightIdx = placement.indexOf('right')
        // right checks
        if (
          (rightIdx === 0 && popoverRect.right > constrainTo.right) ||
          (rightIdx > 0 && popoverRect.left < constrainTo.left)
        ) {
          placement = placement.replace('right', 'left')
        }
      }
      // handles center Y-axis case
      if (flip || flipY) {
        if (placement === 'left' || placement === 'right') {
          if (popoverRect.top < constrainTo.top) {
            placement += 'top'
          } else if (popoverRect.bottom > constrainTo.bottom) {
            placement += 'bottom'
          }
        }
      }
    }

    if (flip || flipY) {
      // top checks
      if (
        (topIdx === 0 && popoverRect.top < constrainTo.top) ||
        (topIdx > 0 && popoverRect.bottom > constrainTo.bottom)
      ) {
        placement = placement.replace('top', 'bottom')
      } else {
        const bottomIdx = placement.indexOf('bottom')
        // bottom checks
        if (
          (bottomIdx === 0 && popoverRect.bottom > constrainTo.bottom) ||
          (bottomIdx > 0 && popoverRect.top < constrainTo.top)
        ) {
          placement = placement.replace('bottom', 'top')
        }
      }
    }
  } else if (typeof constrainStrategy === 'function') {
    placement = constrain(triggerRect, popoverRect, constrainTo)

    if (typeof placement !== 'string') return placement
  }

  return placementCallback[placement](
    triggerRect,
    popoverRect,
    constrainTo,
    constrainStrategy
  )
}

const placementCallback = {
  '': (triggerRect, popoverRect, constrainTo) => ({
    placement: 'center',
    style: Object.assign(
      centerX(triggerRect, popoverRect, constrainTo),
      centerY(triggerRect, popoverRect, constrainTo)
    ),
  }),
  top: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'top',
    style: Object.assign(
      centerX(triggerRect, popoverRect, constrainTo),
      startYouterEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  topleft: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'topLeft',
    style: Object.assign(
      startYouterEdge(triggerRect, popoverRect, constrainTo),
      startXinnerEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  topright: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'topRight',
    style: Object.assign(
      startYouterEdge(triggerRect, popoverRect, constrainTo),
      endXinnerEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  innertop: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'innerTop',
    style: Object.assign(
      centerX(triggerRect, popoverRect, constrainTo),
      startYinnerEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  innertopleft: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'innerTopLeft',
    style: Object.assign(
      startXinnerEdge(triggerRect, popoverRect, constrainTo),
      startYinnerEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  innertopright: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'innerTopRight',
    style: Object.assign(
      endXinnerEdge(triggerRect, popoverRect, constrainTo),
      startYinnerEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  right: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'right',
    style: Object.assign(
      endXouterEdge(triggerRect, popoverRect, constrainTo),
      centerY(triggerRect, popoverRect, constrainTo)
    ),
  }),
  righttop: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'rightTop',
    style: Object.assign(
      endXouterEdge(triggerRect, popoverRect, constrainTo),
      startYinnerEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  rightbottom: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'rightBottom',
    style: Object.assign(
      endXouterEdge(triggerRect, popoverRect, constrainTo),
      endYinnerEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  innerright: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'innerRight',
    style: Object.assign(
      endXinnerEdge(triggerRect, popoverRect, constrainTo),
      centerY(triggerRect, popoverRect, constrainTo)
    ),
  }),
  bottom: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'bottom',
    style: Object.assign(
      centerX(triggerRect, popoverRect, constrainTo),
      endYouterEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  bottomleft: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'bottomLeft',
    style: Object.assign(
      startXinnerEdge(triggerRect, popoverRect, constrainTo),
      endYouterEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  bottomright: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'bottomRight',
    style: Object.assign(
      endXinnerEdge(triggerRect, popoverRect, constrainTo),
      endYouterEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  innerbottom: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'innerBottom',
    style: Object.assign(
      centerX(triggerRect, popoverRect, constrainTo),
      endYinnerEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  innerbottomright: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'innerBottomRight',
    style: Object.assign(
      endXinnerEdge(triggerRect, popoverRect, constrainTo),
      endYinnerEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  innerbottomleft: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'innerBottomLeft',
    style: Object.assign(
      startXinnerEdge(triggerRect, popoverRect, constrainTo),
      endYinnerEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  left: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'left',
    style: Object.assign(
      startXouterEdge(triggerRect, popoverRect, constrainTo),
      centerY(triggerRect, popoverRect, constrainTo)
    ),
  }),
  lefttop: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'leftTop',
    style: Object.assign(
      startXouterEdge(triggerRect, popoverRect, constrainTo),
      startYinnerEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  leftbottom: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'leftBottom',
    style: Object.assign(
      startXouterEdge(triggerRect, popoverRect, constrainTo),
      endYinnerEdge(triggerRect, popoverRect, constrainTo)
    ),
  }),
  innerleft: (triggerRect, popoverRect, constrainTo) => ({
    placement: 'innerLeft',
    style: Object.assign(
      startXinnerEdge(triggerRect, popoverRect, constrainTo),
      centerY(triggerRect, popoverRect, constrainTo)
    ),
  }),
}

const defaultPlacements = /outer|center/g

export const setPlacementStyle = (
  requestedPlacement,
  trigger,
  popover,
  constrainTo,
  constrainStrategy
) => {
  if (!trigger || !popover) return requestedPlacement

  if (typeof window !== 'undefined' && constrainTo === window)
    constrainTo = document.documentElement
  let result = {},
    placement = requestedPlacement
  const triggerRect = trigger.getBoundingClientRect(),
    popoverRect = popover.getBoundingClientRect()

  constrainTo = {
    width: constrainTo.offsetWidth,
    height: constrainTo.offsetHeight,
    top: constrainTo.offsetTop,
    right: constrainTo.offsetWidth,
    bottom: constrainTo.offsetHeight,
    left: constrainTo.offsetLeft,
  }

  popoverRect.width = popover.offsetWidth
  popoverRect.height = popover.offsetHeight

  if (typeof placement === 'function') {
    result = requestedPlacement(
      triggerRect,
      popoverRect,
      constrainTo,
      constrainStrategy
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
    const fn = constrain(placement.toLowerCase().replace(defaultPlacements, ''))
    result = fn(triggerRect, popoverRect, constrainTo, constrainStrategy)
  }

  result.requestedPlacement = requestedPlacement
  return result
}
