const centerX = (triggerRect, popoverRect, windowSize) => {
  let right = 'auto',
    left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2
  const boxWidth = (popoverRect.width - triggerRect.width) / 2,
    doesNotFitLeft = left < triggerRect.left && triggerRect.left - boxWidth < 0,
    doesNotFitRight = triggerRect.right + boxWidth > windowSize[0]

  if (doesNotFitLeft && !doesNotFitRight) {
    left = triggerRect.left
  } else if (doesNotFitRight && !doesNotFitLeft) {
    left = 'auto'
    right = 0
  } else if (doesNotFitRight && doesNotFitLeft) {
    left = (windowSize[0] - popoverRect.width) / 2
  }

  return {left, right}
}

const centerY = (triggerRect, popoverRect, windowSize) => {
  let bottom = 'auto',
    top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2
  const boxHeight = (popoverRect.height - triggerRect.height) / 2,
    doesNotFitTop = top < triggerRect.top && triggerRect.top - boxHeight < 0,
    doesNotFitBottom = triggerRect.bottom + boxHeight > windowSize[1]

  if (doesNotFitTop && !doesNotFitBottom) {
    top = 0
  } else if (doesNotFitBottom && !doesNotFitTop) {
    top = 'auto'
    bottom = 0
  } else if (doesNotFitBottom && doesNotFitTop) {
    top = (windowSize[1] - popoverRect.height) / 2
  }

  return {top, bottom}
}

const startXinnerEdge = (triggerRect, boxSize, windowSize) => ({
  left: triggerRect.left,
  right: 'auto',
})

const startXouterEdge = (triggerRect, boxSize, windowSize) => ({
  left: 'auto',
  right: windowSize[0] - triggerRect.left,
})

const endXouterEdge = (triggerRect, boxSize, windowSize) => ({
  left: triggerRect.right,
  right: 'auto',
})

const endXinnerEdge = (triggerRect, boxSize, windowSize) => {
  return {
    left: 'auto',
    right: windowSize[0] - triggerRect.right,
  }
}

const startYinnerEdge = (triggerRect, boxSize, windowSize) => ({
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

const endYouterEdge = (triggerRect, boxSize, windowSize) => ({
  top: triggerRect.bottom,
  bottom: 'auto',
})

const placementCallback = {
  '': (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'center',
      style: Object.assign(
        centerX(triggerRect, popoverRect, windowSize),
        centerY(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  top: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'top',
      style: Object.assign(
        centerX(triggerRect, popoverRect, windowSize),
        startYouterEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  topleft: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'topLeft',
      style: Object.assign(
        startYouterEdge(triggerRect, popoverRect, windowSize),
        startXinnerEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  topright: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'topRight',
      style: Object.assign(
        startYouterEdge(triggerRect, popoverRect, windowSize),
        endXinnerEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  innertop: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerTop',
      style: Object.assign(
        centerX(triggerRect, popoverRect, windowSize),
        startYinnerEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  innertopleft: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerTopLeft',
      style: Object.assign(
        startXinnerEdge(triggerRect, popoverRect, windowSize),
        startYinnerEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  innertopright: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerTopRight',
      style: Object.assign(
        endXinnerEdge(triggerRect, popoverRect, windowSize),
        startYinnerEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  right: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'right',
      style: Object.assign(
        endXouterEdge(triggerRect, popoverRect, windowSize),
        centerY(triggerRect, popoverRect, windowSize[1])
      ),
    }
  },
  righttop: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'rightTop',
      style: Object.assign(
        endXouterEdge(triggerRect, popoverRect, windowSize),
        startYinnerEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  innerright: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerRight',
      style: Object.assign(
        endXinnerEdge(triggerRect, popoverRect, windowSize),
        centerY(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  bottom: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'bottom',
      style: Object.assign(
        centerX(triggerRect, popoverRect, windowSize),
        endYouterEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  bottomleft: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'bottomLeft',
      style: Object.assign(
        startXinnerEdge(triggerRect, popoverRect, windowSize),
        endYouterEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  bottomright: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'bottomRight',
      style: Object.assign(
        endXinnerEdge(triggerRect, popoverRect, windowSize),
        endYouterEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  innerbottom: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerBottom',
      style: Object.assign(
        centerX(triggerRect, popoverRect, windowSize),
        endYinnerEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  innerbottomright: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerBottomRight',
      style: Object.assign(
        endXinnerEdge(triggerRect, popoverRect, windowSize),
        endYinnerEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  innerbottomleft: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerBottomLeft',
      style: Object.assign(
        startXinnerEdge(triggerRect, popoverRect, windowSize),
        endYinnerEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  left: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'left',
      style: Object.assign(
        startXouterEdge(triggerRect, popoverRect, windowSize),
        centerY(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  lefttop: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'leftTop',
      style: Object.assign(
        startXouterEdge(triggerRect, popoverRect, windowSize),
        startYinnerEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  leftbottom: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'leftBottom',
      style: Object.assign(
        startXouterEdge(triggerRect, popoverRect, windowSize),
        endYinnerEdge(triggerRect, popoverRect, windowSize)
      ),
    }
  },
  innerleft: (triggerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerLeft',
      style: Object.assign(
        startXinnerEdge(triggerRect, popoverRect, windowSize),
        centerY(triggerRect, popoverRect, windowSize)
      ),
    }
  },
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
        if (result.placement === void 0) {
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
