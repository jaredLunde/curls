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

const startXleftEdge = containerRect => ({
  left: containerRect.left,
  right: 'auto',
})
const startXrightEdge = containerRect => ({
  left: 'auto',
  right: document.documentElement.clientWidth - containerRect.left,
})
const endXleftEdge = containerRect => ({
  left: containerRect.right,
  right: 'auto',
})
const endXrightEdge = containerRect => ({
  left: 'auto',
  right: document.documentElement.clientWidth - containerRect.right,
})
const startYtopEdge = containerRect => ({
  top: containerRect.top,
  bottom: 'auto',
})
const startYbottomEdge = containerRect => ({
  top: 'auto',
  bottom: document.documentElement.clientHeight - containerRect.top,
})
const endYtopEdge = containerRect => ({
  top: containerRect.bottom,
  bottom: 'auto',
})
const endYbottomEdge = containerRect => ({
  top: 'auto',
  bottom: document.documentElement.clientHeight - containerRect.bottom,
})

const directionFn = {
  fromCenter(containerRect, boxRect, {width, height}) {
    return Object.assign(
      {renderPosition: 'center'},
      centerX(containerRect, boxRect, width),
      centerY(containerRect, boxRect, height)
    )
  },
  fromTop(containerRect, boxRect, {width, height}) {
    return Object.assign(
      {renderPosition: 'top'},
      startYbottomEdge(containerRect, boxRect),
      centerX(containerRect, boxRect, width)
    )
  },
  fromRight(containerRect, boxRect, {width, height}) {
    return Object.assign(
      {renderPosition: 'right'},
      endXleftEdge(containerRect, boxRect),
      centerY(containerRect, boxRect, height)
    )
  },
  fromBottom(containerRect, boxRect, {width, height}) {
    return Object.assign(
      {renderPosition: 'bottom'},
      endYtopEdge(containerRect, boxRect),
      centerX(containerRect, boxRect, width)
    )
  },
  fromLeft(containerRect, boxRect, {width, height}) {
    return Object.assign(
      {renderPosition: 'left'},
      startXrightEdge(containerRect, boxRect),
      centerY(containerRect, boxRect, height)
    )
  },
  fromTopLeft(containerRect, boxRect, dims) {
    return Object.assign(
      {renderPosition: 'topLeft'},
      startYbottomEdge(containerRect, boxRect),
      startXleftEdge(containerRect, boxRect)
    )
  },
  fromTopRight(containerRect, boxRect, dims) {
    return Object.assign(
      {renderPosition: 'topRight'},
      startYbottomEdge(containerRect, boxRect),
      endXrightEdge(containerRect, boxRect)
    )
  },
  fromRightTop(containerRect, boxRect, dims) {
    return Object.assign(
      {renderPosition: 'rightTop'},
      endXleftEdge(containerRect, boxRect, dims),
      startYtopEdge(containerRect, boxRect)
    )
  },
  fromRightBottom(containerRect, boxRect) {
    return Object.assign(
      {renderPosition: 'rightBottom'},
      endXleftEdge(containerRect, boxRect),
      endYbottomEdge(containerRect, boxRect)
    )
  },
  fromBottomLeft(containerRect, boxRect) {
    return Object.assign(
      {renderPosition: 'bottomLeft'},
      endYtopEdge(containerRect, boxRect),
      startXleftEdge(containerRect, boxRect)
    )
  },
  fromBottomRight(containerRect, boxRect) {
    return Object.assign(
      {renderPosition: 'bottomRight'},
      endYtopEdge(containerRect, boxRect),
      endXrightEdge(containerRect, boxRect)
    )
  },
  fromLeftTop(containerRect, boxRect) {
    return Object.assign(
      {renderPosition: 'leftTop'},
      startXrightEdge(containerRect, boxRect),
      startYtopEdge(containerRect, boxRect)
    )
  },
  fromLeftBottom(containerRect, boxRect, dims) {
    return Object.assign(
      {renderPosition: 'leftBottom'},
      startXrightEdge(containerRect, boxRect),
      endYbottomEdge(containerRect, boxRect)
    )
  },
}

export const setDirectionStyle = (direction, container, popoverBox) => {
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
    : directionFn[direction](containerRect, boxRect, {
        width: document.documentElement.width,
        height: document.documentElement.height,
      })
}
