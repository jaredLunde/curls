import {css} from '@emotion/core'

export const breakpoints = {
  xxs: css`only screen and (max-width: 240px)`,
  xs: css`only screen and (max-width: 324px)`,
  sm: css`only screen and (max-width: 639px)`,
  md: css`only screen and (max-width: 1023px)`,
  lg: css`only screen and (max-width: 1279px)`,
  xl: css`only screen and (max-width: 1599px)`,
  xxl: css`only screen and (min-width: 0)`,
}


export const columns = {
  xxs: 2,
  xs: 4,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 16
}


export const userAgent =
  typeof navigator === 'undefined'
  ? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
  : navigator.userAgent
