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

const startX = containerRect => ({left: containerRect.left, right: 'auto'})
const endX = containerRect => ({
  left: 'auto',
  right: document.documentElement.clientWidth - containerRect.right,
})
const startY = containerRect => ({top: containerRect.top, bottom: 'auto'})
const endY = containerRect => ({
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
    let top = 'auto',
      bottom = 'auto',
      renderPosition = 'top'

    if (containerRect.top - boxRect.height > -1) {
      top = containerRect.top - boxRect.height
    } else if (
      containerRect.bottom + (boxRect.height - containerRect.height) / 2 <
      height
    ) {
      top = containerRect.bottom
      renderPosition = 'bottom'
    } else {
      top = 0
    }

    return Object.assign(
      {top, bottom, renderPosition},
      centerX(containerRect, boxRect, width)
    )
  },
  fromRight(containerRect, boxRect, {width, height}) {
    let left = 'auto',
      right = 'auto',
      renderPosition = 'right'

    if (containerRect.right + boxRect.width < width) {
      left = containerRect.right
    } else if (
      containerRect.left - (boxRect.width - containerRect.width) / 2 >
      -1
    ) {
      left = containerRect.left - boxRect.width
      renderPosition = 'left'
    } else {
      right = 0
    }

    return Object.assign(
      {left, right, renderPosition},
      centerY(containerRect, boxRect, height)
    )
  },
  fromBottom(containerRect, boxRect, {width, height}) {
    let top = 'auto',
      bottom = 'auto',
      renderPosition = 'bottom'

    if (containerRect.bottom + boxRect.height < height) {
      top = containerRect.bottom
    } else if (
      containerRect.top - (boxRect.height - containerRect.height) / 2 >
      -1
    ) {
      top = containerRect.top - boxRect.height
      renderPosition = 'top'
    } else {
      bottom = 0
    }

    return Object.assign(
      {top, bottom, renderPosition},
      centerX(containerRect, boxRect, width)
    )
  },
  fromLeft(containerRect, boxRect, {width, height}) {
    let left = 'auto',
      right = 'auto',
      renderPosition = 'left'

    if (containerRect.left - boxRect.width > -1) {
      left = containerRect.left - boxRect.width
    } else if (
      containerRect.right + (boxRect.width - containerRect.width) / 2 <
      width
    ) {
      left = containerRect.right
      renderPosition = 'right'
    } else {
      left = 0
    }

    return Object.assign(
      {left, right, renderPosition},
      centerY(containerRect, boxRect, height)
    )
  },
  fromTopLeft(containerRect, boxRect, dims) {
    return Object.assign(
      this.fromTop(containerRect, boxRect, dims),
      startX(containerRect),
      {renderPosition: 'topLeft'}
    )
  },
  fromTopRight(containerRect, boxRect, dims) {
    return Object.assign(
      this.fromTop(containerRect, boxRect, dims),
      endX(containerRect, boxRect),
      {renderPosition: 'topRight'}
    )
  },
  fromRightTop(containerRect, boxRect, dims) {
    return Object.assign(
      this.fromRight(containerRect, boxRect, dims),
      startY(containerRect, boxRect),
      {renderPosition: 'rightTop'}
    )
  },
  fromRightBottom(containerRect, boxRect, dims) {
    return Object.assign(
      this.fromRight(containerRect, boxRect, dims),
      endY(containerRect, boxRect),
      {renderPosition: 'rightBottom'}
    )
  },
  fromBottomLeft(containerRect, boxRect, dims) {
    return Object.assign(
      this.fromBottom(containerRect, boxRect, dims),
      startX(containerRect),
      {renderPosition: 'bottomLeft'}
    )
  },
  fromBottomRight(containerRect, boxRect, dims) {
    return Object.assign(
      this.fromBottom(containerRect, boxRect, dims),
      endX(containerRect, boxRect),
      {renderPosition: 'bottomRight'}
    )
  },
  fromLeftTop(containerRect, boxRect, dims) {
    return Object.assign(
      this.fromLeft(containerRect, boxRect, dims),
      startY(containerRect),
      {renderPosition: 'leftTop'}
    )
  },
  fromLeftBottom(containerRect, boxRect, dims) {
    return Object.assign(
      this.fromLeft(containerRect, boxRect, dims),
      endY(containerRect, boxRect),
      {renderPosition: 'leftBottom'}
    )
  },
}

export const setDirectionStyle = (
  direction,
  container,
  popoverBox,
  viewportSize
) => {
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
    : directionFn[direction](containerRect, boxRect, viewportSize)
}
