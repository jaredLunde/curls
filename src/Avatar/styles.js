import {css} from '@emotion/core'
import {fastMemoize, memoValue, toSize} from '../utils'


const getAvatarSize = (size, val, theme, props) => {
  if (val === false) return null

  let avatarSize = theme.scale[size]
  const typeOfAvatarSize = typeof avatarSize

  if (typeOfAvatarSize === 'object') {
    return avatarSize
  }
  else if (typeOfAvatarSize === 'function') {
    return avatarSize(theme, props)
  }

  return css`
    width: ${toSize(avatarSize, theme.sizeUnit)};
    height: ${toSize(avatarSize, theme.sizeUnit)};
  `
}

const createSizeShortcut = fastMemoize('avatarSize', s => (v, t, p) => getAvatarSize(s, v, t, p))
export const size = (s, t, p) => createSizeShortcut(s)(true, t, p)
export const orientation = memoValue(
  v => {
    let height, width

    switch (v) {
      case 'square':
        height = '100%'
        width = '100%'
        break;
      case 'landscape':
        height = '100%'
        width = 'auto'
        break;
      case 'portrait':
        height = 'auto'
        width = '100%'
        break;
    }

    return css`
    & img, & picture {
      height: ${height};
      width: ${width};
    }
  `
  }
)