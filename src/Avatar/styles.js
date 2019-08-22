import {css} from '@emotion/core'
import {memoValue, memoTheme, unit, get} from '../utils'
import * as dT from './defaultTheme'

export const src = () => null,
  size = memoTheme((val, theme) => {
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
        width = '100%'
        height = '100%'
        break

      case 'landscape':
        width = 'auto'
        height = '100%'
        break

      case 'portrait':
        width = '100%'
        height = 'auto'
        break
    }

    return css`
      & img,
      & picture {
        width: ${width};
        height: ${height};
      }
    `
  })
