import React, {useRef, useEffect, useState} from 'react'
import {css} from '@emotion/core'
import {useBasicBox} from '../Box'
import {pos} from '../Box/styles'
import {flex, justify, align} from '../Flex/styles'
import {renderNode} from '../createComponent'
import {supportsCSS, loadImage, objectWithoutProps} from '../utils'
import * as styles from './styles'
import propTypes from './propTypes'
import * as defaultTheme from './defaultTheme'
import getImage from './getImage'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'
import useStyles from '../useStyles'


const getOrientation = (width, height) =>
  width > height ? 'landscape' : width === height ? 'square' : 'portrait'
const useImageOrientation = () => {
  const
    element = useRef(null),
    [orientation, setOrientation] = useState('square')

  useEffect(
    () => {
      if (element.current !== null) {
        const loader = loadImage(element.current)
        loader.then(({target}) => setOrientation(
          getOrientation(target.naturalWidth, target.naturalHeight)
        ))
        return loader.cancel.bind(loader)
      }
    },
    [element.current]
  )

  return [element, orientation]
}

const
  defaultCSS = css([
    flex,
    pos.relative,
    justify.center,
    align.center,
    'overflow: hidden;',
    '& img {object-fit: cover;}'
  ]),
  options = {name: 'avatar', styles, defaultTheme},
  supportsObjectFit = supportsCSS('object-fit'),
  withoutAlt = {alt: 0},
  Avatar = React.forwardRef(
    (props, ref) => {
      let imageRef
      props = Object.assign({}, props)

      if (supportsObjectFit)
        props.orientation = 'square'
      else {
        const o = useImageOrientation()
        imageRef = o[0]
        props.orientation = o[1]
      }

      props = useBasicBox(useStyles(props, options))
      props.as = props.as || 'span'

      const imgProps = Object.assign({}, props)
      if (imgProps !== void 0) {
        imgProps.innerRef = el => {
          imageRef !== void 0 && (imageRef.current = el)

          if (typeof ref === 'function')
            ref(el)
          else if (typeof ref === 'object' && ref !== null && ref.current !== void 0)
            ref.current = el
        }
      }
      else
        imgProps.innerRef = ref

      props = objectWithoutProps(props, withoutAlt)
      props.children = (props.children || getImage)(imgProps)
      return renderNode(props, defaultCSS)
    }
  )

if (__DEV__) {
  Avatar.displayName = 'Avatar'
  Avatar.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}

export default Avatar