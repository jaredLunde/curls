import React, {useRef, useEffect, useState} from 'react'
import {css} from '@emotion/core'
import {createElement, useStyles} from '@style-hooks/core'
import {useBasicBox} from '../Box'
import {supportsCSS, loadImage, pushCss} from '../utils'
import * as styles from './styles'
import getImage from './getImage'


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
  defaultStyles = css`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    & img {object-fit: cover;}
  `,
  options = {name: 'avatar', styles},
  supportsObjectFit = supportsCSS('object-fit')

export const
  useAvatar = props => useStyles(options, pushCss(props, defaultStyles)),
  Avatar = React.forwardRef((props, ref) => {
    let
      imageRef,
      src = props.src

    if (supportsObjectFit)
      props.orientation = 'square'
    else {
      const o = useImageOrientation()
      imageRef = o[0]
      props.orientation = o[1]
    }

    props = useBasicBox(useAvatar(props))
    const imgProps = Object.assign(
      {
        src,
        ref: el => {
          imageRef !== void 0 && (imageRef.current = el)

          if (typeof ref === 'function')
            ref(el)
          else if (typeof ref === 'object' && ref !== null && ref.current !== void 0)
            ref.current = el
        }
      },
      props
    )
    delete props.alt
    props.children = (props.children || getImage)(imgProps)

    return createElement('span', props)
  })

if (__DEV__) {
  const
    propTypes = require('./propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Avatar.displayName = 'Avatar'
  Avatar.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}