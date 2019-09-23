const centerX = (triggerRect, popoverRect, windowSize) => ({
  left: 'auto',
  right:
    windowSize[0] -
    triggerRect.right -
    (popoverRect.width - triggerRect.width) / 2,
})

const centerY = (triggerRect, popoverRect, windowSize) => ({
  top: 'auto',
  bottom:
    windowSize[1] -
    triggerRect.bottom -
    (popoverRect.height - triggerRect.height) / 2,
})

const startXinnerEdge = triggerRect => ({
  left: triggerRect.left,
  right: 'auto',
})

const startXouterEdge = (triggerRect, boxSize, windowSize) => ({
  left: 'auto',
  right: windowSize[0] - triggerRect.left,
})

const endXouterEdge = triggerRect => ({
  left: triggerRect.right,
  right: 'auto',
})

const endXinnerEdge = (triggerRect, boxSize, windowSize) => {
  return {
    left: 'auto',
    right: windowSize[0] - triggerRect.right,
  }
}

const startYinnerEdge = triggerRect => ({
  top: triggerRect.top,
  bottom: 'auto',
})

const startYouterEdge = (triggerRect, boxSize, windowSize) => ({
  top: 'auto',
  bottom: windowSize[1] - triggerRect.top,
})

const endYinnerEdge = (triggerRect, boxSize, windowSize) => ({
  top: 'auto',
  bottom: windowSize[1] - triggerRect.bottom,
})

const endYouterEdge = triggerRect => ({
  top: triggerRect.bottom,
  bottom: 'auto',
})

const placementCallback = {
  '': (triggerRect, popoverRect, windowSize) => ({
    placement: 'center',
    style: Object.assign(
      centerX(triggerRect, popoverRect, windowSize),
      centerY(triggerRect, popoverRect, windowSize)
    ),
  }),
  top: (triggerRect, popoverRect, windowSize) => ({
    placement: 'top',
    style: Object.assign(
      centerX(triggerRect, popoverRect, windowSize),
      startYouterEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  topleft: (triggerRect, popoverRect, windowSize) => ({
    placement: 'topLeft',
    style: Object.assign(
      startYouterEdge(triggerRect, popoverRect, windowSize),
      startXinnerEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  topright: (triggerRect, popoverRect, windowSize) => ({
    placement: 'topRight',
    style: Object.assign(
      startYouterEdge(triggerRect, popoverRect, windowSize),
      endXinnerEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  innertop: (triggerRect, popoverRect, windowSize) => ({
    placement: 'innerTop',
    style: Object.assign(
      centerX(triggerRect, popoverRect, windowSize),
      startYinnerEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  innertopleft: (triggerRect, popoverRect, windowSize) => ({
    placement: 'innerTopLeft',
    style: Object.assign(
      startXinnerEdge(triggerRect, popoverRect, windowSize),
      startYinnerEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  innertopright: (triggerRect, popoverRect, windowSize) => ({
    placement: 'innerTopRight',
    style: Object.assign(
      endXinnerEdge(triggerRect, popoverRect, windowSize),
      startYinnerEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  right: (triggerRect, popoverRect, windowSize) => ({
    placement: 'right',
    style: Object.assign(
      endXouterEdge(triggerRect, popoverRect, windowSize),
      centerY(triggerRect, popoverRect, windowSize)
    ),
  }),
  righttop: (triggerRect, popoverRect, windowSize) => ({
    placement: 'rightTop',
    style: Object.assign(
      endXouterEdge(triggerRect, popoverRect, windowSize),
      startYinnerEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  innerright: (triggerRect, popoverRect, windowSize) => ({
    placement: 'innerRight',
    style: Object.assign(
      endXinnerEdge(triggerRect, popoverRect, windowSize),
      centerY(triggerRect, popoverRect, windowSize)
    ),
  }),
  bottom: (triggerRect, popoverRect, windowSize) => ({
    placement: 'bottom',
    style: Object.assign(
      centerX(triggerRect, popoverRect, windowSize),
      endYouterEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  bottomleft: (triggerRect, popoverRect, windowSize) => ({
    placement: 'bottomLeft',
    style: Object.assign(
      startXinnerEdge(triggerRect, popoverRect, windowSize),
      endYouterEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  bottomright: (triggerRect, popoverRect, windowSize) => ({
    placement: 'bottomRight',
    style: Object.assign(
      endXinnerEdge(triggerRect, popoverRect, windowSize),
      endYouterEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  innerbottom: (triggerRect, popoverRect, windowSize) => ({
    placement: 'innerBottom',
    style: Object.assign(
      centerX(triggerRect, popoverRect, windowSize),
      endYinnerEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  innerbottomright: (triggerRect, popoverRect, windowSize) => ({
    placement: 'innerBottomRight',
    style: Object.assign(
      endXinnerEdge(triggerRect, popoverRect, windowSize),
      endYinnerEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  innerbottomleft: (triggerRect, popoverRect, windowSize) => ({
    placement: 'innerBottomLeft',
    style: Object.assign(
      startXinnerEdge(triggerRect, popoverRect, windowSize),
      endYinnerEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  left: (triggerRect, popoverRect, windowSize) => ({
    placement: 'left',
    style: Object.assign(
      startXouterEdge(triggerRect, popoverRect, windowSize),
      centerY(triggerRect, popoverRect, windowSize)
    ),
  }),
  lefttop: (triggerRect, popoverRect, windowSize) => ({
    placement: 'leftTop',
    style: Object.assign(
      startXouterEdge(triggerRect, popoverRect, windowSize),
      startYinnerEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  leftbottom: (triggerRect, popoverRect, windowSize) => ({
    placement: 'leftBottom',
    style: Object.assign(
      startXouterEdge(triggerRect, popoverRect, windowSize),
      endYinnerEdge(triggerRect, popoverRect, windowSize)
    ),
  }),
  innerleft: (triggerRect, popoverRect, windowSize) => ({
    placement: 'innerLeft',
    style: Object.assign(
      startXinnerEdge(triggerRect, popoverRect, windowSize),
      centerY(triggerRect, popoverRect, windowSize)
    ),
  }),
}

const defaultPlacements = /outer|center/g

export const setPlacementStyle = (
  requestedPlacement,
  trigger,
  popover,
  windowSize
) => {
  let result,
    placement = requestedPlacement
  const triggerRect = trigger.getBoundingClientRect(),
    popoverRect = popover.getBoundingClientRect()
  popoverRect.width = popover.offsetWidth
  popoverRect.height = popover.offsetHeight

  if (typeof placement === 'function') {
    result = requestedPlacement(triggerRect, popoverRect, {
      width: windowSize[0],
      height: windowSize[1],
    })

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
    result = placementCallback[
      placement.toLowerCase().replace(defaultPlacements, '')
    ](triggerRect, popoverRect, windowSize)
  }

  result.requestedPlacement = requestedPlacement
  return result
}
