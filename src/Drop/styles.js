import {css} from '@emotion/core'
import {isVisible_ as isSlideVisible} from '../Slide/styles'
import {isVisible_ as isFadeVisible, isNotVisible_} from '../Fade/styles'

const isVisible_ = css`
  ${isSlideVisible};
  ${isFadeVisible};
`
export const isVisible = v => (v === true ? isVisible_ : isNotVisible_)
export {fromRight, fromLeft, fromTop, fromBottom} from '../Slide/styles'
