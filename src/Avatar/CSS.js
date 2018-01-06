import {css} from 'emotion'
import {getAvatarSize} from './utils'


export function xxs (v, t) {
  return getAvatarSize('xxs', t)
}

export function xs (v, t) {
  return getAvatarSize('xs', t)
}

export function sm (v, t) {
  return getAvatarSize('sm', t)
}

export function md (v, t) {
  return getAvatarSize('md', t)
}

export function lg (v, t) {
  return getAvatarSize('lg', t)
}

export function xl (v, t) {
  return getAvatarSize('xl', t)
}

export function xxl (v, t) {
  return getAvatarSize('xxl', t)
}

export function orientation (v, t) {
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
}
