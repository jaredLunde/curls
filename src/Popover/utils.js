const centerX = (containerRect, boxRect, width) => {
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

const centerY = (containerRect, boxRect, height) => {
  let bottom = 'auto',
    top = containerRect.top + (containerRect.height - boxRect.height) / 2
  const boxHeight = (boxRect.height - containerRect.height) / 2,
    doesNotFitTop =
      top < containerRect.top && containerRect.top - boxHeight < 0,
    doesNotFitBottom = containerRect.bottom + boxHeight > height

  if (doesNotFitTop && !doesNotFitBottom) {
    top = 0
  } else if (doesNotFitBottom && !doesNotFitTop) {
    top = 'auto'
    bottom = 0
  } else if (doesNotFitBottom && doesNotFitTop) {
    top = (height - boxRect.height) / 2
  }

  return {top, bottom}
}

const startXinnerEdge = containerRect => ({
  left: containerRect.left,
  right: 'auto',
})
const startXouterEdge = containerRect => ({
  left: 'auto',
  right: document.documentElement.clientWidth - containerRect.left,
})
const endXouterEdge = containerRect => ({
  left: containerRect.right,
  right: 'auto',
})
const endXinnerEdge = containerRect => ({
  left: 'auto',
  right: document.documentElement.clientWidth - containerRect.right,
})
const startYinnerEdge = containerRect => ({
  top: containerRect.top,
  bottom: 'auto',
})
const startYouterEdge = containerRect => ({
  top: 'auto',
  bottom: document.documentElement.clientHeight - containerRect.top,
})
const endYinnerEdge = containerRect => ({
  top: 'auto',
  bottom: document.documentElement.clientHeight - containerRect.bottom,
})
const endYouterEdge = containerRect => ({
  top: containerRect.bottom,
  bottom: 'auto',
})

const placementCallback = {
  center: (containerRect, boxRect, windowSize) => {
    return {
      placement: 'center',
      style: Object.assign(
        centerX(containerRect, boxRect, windowSize.width),
        centerY(containerRect, boxRect, windowSize.height)
      ),
    }
  },
  top: (containerRect, boxRect, windowSize) => {
    return {
      placement: 'top',
      style: Object.assign(
        startYouterEdge(containerRect, boxRect),
        centerX(containerRect, boxRect, windowSize.width)
      ),
    }
  },
  topleft: (containerRect, boxRect, windowSize) => {
    return {
      placement: 'topLeft',
      style: Object.assign(
        startXinnerEdge(containerRect, boxRect),
        startYinnerEdge(containerRect, boxRect)
      ),
    }
  },
  topright: (containerRect, boxRect, windowSize) => {},
  right: (containerRect, boxRect, windowSize) => {},
  righttop: (containerRect, boxRect, windowSize) => {},
  rightbottom: (containerRect, boxRect, windowSize) => {},
  bottom: (containerRect, boxRect, windowSize) => {},
  bottomleft: (containerRect, boxRect, windowSize) => {},
  bottomright: (containerRect, boxRect, windowSize) => {},
  left: (containerRect, boxRect, windowSize) => {},
  lefttop: (containerRect, boxRect, windowSize) => {
    return {
      placement: 'leftTop',
      style: Object.assign(
        startXouterEdge(containerRect, boxRect),
        startYinnerEdge(containerRect, boxRect)
      ),
    }
  },
  leftbottom: (containerRect, boxRect, windowSize) => {
    return {
      placement: 'leftBottom',
      style: Object.assign(
        startXouterEdge(containerRect, boxRect),
        endYinnerEdge(containerRect, boxRect)
      ),
    }
  },
}

const directionCallback = {
  fromRight(containerRect, boxRect, {width, height}) {
    return Object.assign(
      {placement: 'right'},
      endXouterEdge(containerRect, boxRect),
      centerY(containerRect, boxRect, height)
    )
  },
  fromBottom(containerRect, boxRect, {width, height}) {
    return Object.assign(
      {placement: 'bottom'},
      endYouterEdge(containerRect, boxRect),
      centerX(containerRect, boxRect, width)
    )
  },
  fromLeft(containerRect, boxRect, {width, height}) {
    return Object.assign(
      {placement: 'left'},
      startXinnerEdge(containerRect, boxRect),
      centerY(containerRect, boxRect, height)
    )
  },
  fromTopLeft(containerRect, boxRect, dims) {
    return Object.assign(
      {placement: 'topLeft'},
      startYouterEdge(containerRect, boxRect),
      startXouterEdge(containerRect, boxRect)
    )
  },
  fromTopRight(containerRect, boxRect, dims) {
    return Object.assign(
      {placement: 'topRight'},
      startYouterEdge(containerRect, boxRect),
      endXinnerEdge(containerRect, boxRect)
    )
  },
  fromRightTop(containerRect, boxRect, dims) {
    return Object.assign(
      {placement: 'rightTop'},
      endXouterEdge(containerRect, boxRect, dims),
      startYinnerEdge(containerRect, boxRect)
    )
  },
  fromRightBottom(containerRect, boxRect) {
    return Object.assign(
      {placement: 'rightBottom'},
      endXouterEdge(containerRect, boxRect),
      endYouterEdge(containerRect, boxRect)
    )
  },
  fromBottomLeft(containerRect, boxRect) {
    return Object.assign(
      {placement: 'bottomLeft'},
      endYouterEdge(containerRect, boxRect),
      startXouterEdge(containerRect, boxRect)
    )
  },
  fromBottomRight(containerRect, boxRect) {
    return Object.assign(
      {placement: 'bottomRight'},
      endYouterEdge(containerRect, boxRect),
      endXinnerEdge(containerRect, boxRect)
    )
  },
  fromLeftBottom(containerRect, boxRect, dims) {
    return Object.assign(
      {placement: 'leftBottom'},
      startXinnerEdge(containerRect, boxRect),
      endYinnerEdge(containerRect, boxRect)
    )
  },
}

const defaultPlacements = /outer|inner/

export const setPlacementStyle = (placement, container, popoverBox) => {
  if (!container) return null
  let containerRect = container.getBoundingClientRect()
  let boxRect = false

  if (popoverBox) {
    boxRect = container.getBoundingClientRect()
    boxRect = {
      top: boxRect.top,
      right: boxRect.right,
      bottom: boxRect.bottom,
      left: boxRect.left,
      width: popoverBox.offsetWidth,
      height: popoverBox.offsetHeight,
    }
  }

  return !containerRect
    ? null
    : placementCallback[placement.toLowerCase().replace(defaultPlacements, '')](
        containerRect,
        boxRect,
        {
          width: document.documentElement.width,
          height: document.documentElement.height,
        }
      )
}
