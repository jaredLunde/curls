import {css} from '@emotion/core'
import {memoValue, memoTheme, unit, get} from '../utils'
import * as dT from './defaultTheme'

export const src = () => null,
  size = memoTheme((val, theme) => {
    if (val === false) return null

    let avatarSize = get(theme.avatar, 'scale', dT)[val],
      typeOfAvatarSize = typeof avatarSize

    if (typeOfAvatarSize === 'object') return avatarSize
    else if (typeOfAvatarSize === 'function') return avatarSize(theme)

    const sizeUnit = get(theme.avatar, 'sizeUnit', dT)
    return css`
      width: ${unit(avatarSize, sizeUnit)};
      height: ${unit(avatarSize, sizeUnit)};
    `
  }),
  orientation = memoValue(v => {
    let height, width

    switch (v) {
      case 'square':
        height = '100%'
        width = '100%'
        break
      case 'landscape':
        height = '100%'
        width = 'auto'
        break
      case 'portrait':
        height = 'auto'
        width = '100%'
        break
    }

    return css`
      & img,
      & picture {
        height: ${height};
        width: ${width};
      }
    `
  })
