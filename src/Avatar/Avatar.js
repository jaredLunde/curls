import React from 'react'
import {css} from '@emotion/core'
import ImageProps from '@render-props/image-props'
import {BasicBox} from '../Box'
import {pos, d, ov} from '../Box/styles'
import createComponent, {renderNode} from '../createComponent'
import {supportsCSS} from '../utils'
import * as styles from './styles'
import propTypes from './propTypes'
import * as defaultTheme from './defaultTheme'
import getImage from './getImage'


/**
<Avatar md src='...'>
  {({innerRef, ...props}) => (
    <img {...props} ref={innerRef}/>
  )}
</Avatar>
*/

const as = 'span'
const defaultCSS = css`
  ${d.inlineBlock};
  text-align: center;
  ${pos.relative}
  ${ov('hidden')};

  & > img {
    object-fit: cover;
  }
`
const SFC = createComponent({
  name: 'avatar',
  styles,
  defaultTheme,
  propTypes,
})

const SFCWithImageProps = function (props) {
  return (
    <ImageProps>
      {function (imageContext) {
        return SFC({...imageContext, ...props})
      }}
    </ImageProps>
  )
}

const supportsObjectFit = supportsCSS('object-fit')

const Avatar = React.forwardRef(
  function Avatar (props, innerRef) {
    const sfcProps = {
      innerRef,
      ...props,
      children: function (boxProps) {
        // adds child prop for 'Box' and rendering the avatar node
        boxProps.children = function (nodeProps) {
          nodeProps.as = nodeProps.as || as
          let innerRef

          if (nodeProps.imageRef) {
            innerRef = (...args) => {
              nodeProps.imageRef(...args)
              if (nodeProps.innerRef) {
                nodeProps.innerRef(...args)
              }
            }
          }

          delete nodeProps.imageRef
          const alt = nodeProps.alt
          delete nodeProps.alt

          const imgProps = {
            ...nodeProps,
            alt,
            src: props.src,
            defaultSrc: props.defaultSrc,
            innerRef
          }

          nodeProps.children = (props.children || getImage)(imgProps)
          return renderNode(nodeProps, defaultCSS)
        }

        return BasicBox(boxProps)
      }
    }

    if (supportsObjectFit) {
      sfcProps.orientation = 'square'
    }

    return (supportsObjectFit ? SFC : SFCWithImageProps)(sfcProps)
  }
)

Avatar.propTypes /* remove-proptypes */ = propTypes
export default Avatar