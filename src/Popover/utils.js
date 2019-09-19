const centerX = (containerRect, popoverRect, windowSize) => {
  let right = 'auto',
    left = containerRect.left + (containerRect.width - popoverRect.width) / 2
  const boxWidth = (popoverRect.width - containerRect.width) / 2,
    doesNotFitLeft =
      left < containerRect.left && containerRect.left - boxWidth < 0,
    doesNotFitRight = containerRect.right + boxWidth > windowSize[0]

  if (doesNotFitLeft && !doesNotFitRight) {
    left = containerRect.left
  } else if (doesNotFitRight && !doesNotFitLeft) {
    left = 'auto'
    right = 0
  } else if (doesNotFitRight && doesNotFitLeft) {
    left = (windowSize[0] - popoverRect.width) / 2
  }

  return {left, right}
}

const centerY = (containerRect, popoverRect, windowSize) => {
  let bottom = 'auto',
    top = containerRect.top + (containerRect.height - popoverRect.height) / 2
  const boxHeight = (popoverRect.height - containerRect.height) / 2,
    doesNotFitTop =
      top < containerRect.top && containerRect.top - boxHeight < 0,
    doesNotFitBottom = containerRect.bottom + boxHeight > windowSize[1]

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

const startXinnerEdge = (containerRect, boxSize, windowSize) => ({
  left: containerRect.left,
  right: 'auto',
})

const startXouterEdge = (containerRect, boxSize, windowSize) => ({
  left: 'auto',
  right: windowSize[0] - containerRect.left,
})

const endXouterEdge = (containerRect, boxSize, windowSize) => ({
  left: containerRect.right,
  right: 'auto',
})

const endXinnerEdge = (containerRect, boxSize, windowSize) => {
  return {
    left: 'auto',
    right: windowSize[0] - containerRect.right,
  }
}

const startYinnerEdge = (containerRect, boxSize, windowSize) => ({
  top: containerRect.top,
  bottom: 'auto',
})

const startYouterEdge = (containerRect, boxSize, windowSize) => ({
  top: 'auto',
  bottom: windowSize[1] - containerRect.top,
})

const endYinnerEdge = (containerRect, boxSize, windowSize) => ({
  top: 'auto',
  bottom: windowSize[1] - containerRect.bottom,
})

const endYouterEdge = (containerRect, boxSize, windowSize) => ({
  top: containerRect.bottom,
  bottom: 'auto',
})

const placementCallback = {
  '': (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'center',
      style: Object.assign(
        centerX(containerRect, popoverRect, windowSize),
        centerY(containerRect, popoverRect, windowSize)
      ),
    }
  },
  top: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'top',
      style: Object.assign(
        centerX(containerRect, popoverRect, windowSize),
        startYouterEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  topleft: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'topLeft',
      style: Object.assign(
        startYouterEdge(containerRect, popoverRect, windowSize),
        startXinnerEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  topright: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'topRight',
      style: Object.assign(
        startYouterEdge(containerRect, popoverRect, windowSize),
        endXinnerEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  innertop: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerTop',
      style: Object.assign(
        centerX(containerRect, popoverRect, windowSize),
        startYinnerEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  innertopleft: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerTopLeft',
      style: Object.assign(
        startXinnerEdge(containerRect, popoverRect, windowSize),
        startYinnerEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  innertopright: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerTopRight',
      style: Object.assign(
        endXinnerEdge(containerRect, popoverRect, windowSize),
        startYinnerEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  right: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'right',
      style: Object.assign(
        endXouterEdge(containerRect, popoverRect, windowSize),
        centerY(containerRect, popoverRect, windowSize[1])
      ),
    }
  },
  righttop: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'rightTop',
      style: Object.assign(
        endXouterEdge(containerRect, popoverRect, windowSize),
        startYinnerEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  innerright: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerRight',
      style: Object.assign(
        endXinnerEdge(containerRect, popoverRect, windowSize),
        centerY(containerRect, popoverRect, windowSize)
      ),
    }
  },
  bottom: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'bottom',
      style: Object.assign(
        centerX(containerRect, popoverRect, windowSize),
        endYouterEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  bottomleft: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'bottomLeft',
      style: Object.assign(
        startXinnerEdge(containerRect, popoverRect, windowSize),
        endYouterEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  bottomright: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'bottomRight',
      style: Object.assign(
        endXinnerEdge(containerRect, popoverRect, windowSize),
        endYouterEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  innerbottom: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerBottom',
      style: Object.assign(
        centerX(containerRect, popoverRect, windowSize),
        endYinnerEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  innerbottomright: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerBottomRight',
      style: Object.assign(
        endXinnerEdge(containerRect, popoverRect, windowSize),
        endYinnerEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  innerbottomleft: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerBottomLeft',
      style: Object.assign(
        startXinnerEdge(containerRect, popoverRect, windowSize),
        endYinnerEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  left: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'left',
      style: Object.assign(
        startXouterEdge(containerRect, popoverRect, windowSize),
        centerY(containerRect, popoverRect, windowSize)
      ),
    }
  },
  lefttop: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'leftTop',
      style: Object.assign(
        startXouterEdge(containerRect, popoverRect, windowSize),
        startYinnerEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  leftbottom: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'leftBottom',
      style: Object.assign(
        startXouterEdge(containerRect, popoverRect, windowSize),
        endYinnerEdge(containerRect, popoverRect, windowSize)
      ),
    }
  },
  innerleft: (containerRect, popoverRect, windowSize) => {
    return {
      placement: 'innerLeft',
      style: Object.assign(
        startXinnerEdge(containerRect, popoverRect, windowSize),
        centerY(containerRect, popoverRect, windowSize)
      ),
    }
  },
}

const defaultPlacements = /outer|center/g

export const setPlacementStyle = (
  requestedPlacement,
  container,
  popover,
  windowSize
) => {
  let result,
    placement = requestedPlacement
  const containerRect = container.getBoundingClientRect(),
    popoverRect = popover.getBoundingClientRect()
  popoverRect.width = popover.offsetWidth
  popoverRect.height = popover.offsetHeight

  if (typeof placement === 'function') {
    result = requestedPlacement(containerRect, popoverRect, {
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
    ](containerRect, popoverRect, windowSize)
  }

  result.requestedPlacement = requestedPlacement
  return result
}
