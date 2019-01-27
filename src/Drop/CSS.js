import {css} from '@emotion/core'
import {isVisible_ as isSlideVisible} from '../Slide/CSS'
import {isVisible_ as isFadeVisible, isNotVisible_} from '../Fade/CSS'


const isVisible_ = css`${isSlideVisible}; ${isFadeVisible};`

export function isVisible (value, theme) {
  return value === true ? isVisible_ : isNotVisible_
}

export {fromRight, fromLeft, fromTop, fromBottom} from '../Slide/CSS'
