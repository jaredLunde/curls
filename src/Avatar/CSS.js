import {css} from '@emotion/core'
import {fastMemoize, nullIfFalse, toSize} from '../utils'


function getAvatarSize (size, val, theme, props) {
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
    width: ${toSize(avatarSize, 'rem')};
    height: ${toSize(avatarSize, 'rem')};
  `
}

const createSizeShortcut = fastMemoize('avatarSize', s => (v, t, p) => getAvatarSize(s, v, t, p))
export const xxs = createSizeShortcut('xxs')
export const xs = createSizeShortcut('xs')
export const sm = createSizeShortcut('sm')
export const md = createSizeShortcut('md')
export const lg = createSizeShortcut('lg')
export const xl = createSizeShortcut('xl')
export const xxl = createSizeShortcut('xxl')
export const size = (s, t, p) => createSizeShortcut(s)(true, t, p)
export const orientation = nullIfFalse(v => {
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
    & > img {
      height: ${height};
      width: ${width};
    }
  `
})