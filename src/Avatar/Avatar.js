import React from 'react'
import {css} from '@emotion/core'
import ImageProps from '@render-props/image-props'
import {BasicBox} from '../Box'
import {pos, d, ov} from '../Box/styles'
import createComponent, {renderNode} from '../createComponent'
import {supportsCSS, withChildren} from '../utils'
import * as styles from './styles'
import propTypes from './propTypes'
import * as defaultTheme from './defaultTheme'
import getImage from './getImage'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'


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
  overflow: hidden;

  & img {
    object-fit: cover;
  }
`
const SFC = createComponent({
  name: 'avatar',
  styles,
  defaultTheme,
  propTypes,
})

const SFCWithImageProps = props => <ImageProps
  children={(imageContext) => SFC(Object.assign({}, imageContext, props))}
/>

const supportsObjectFit = supportsCSS('object-fit')

const Avatar = React.forwardRef(
  (props, innerRef) => {
    const sfcProps = withChildren(
      props,
      boxProps => {
        // adds child prop for 'Box' and rendering the avatar node
        boxProps.children = ({alt, imageRef, ...nodeProps}) => {
          nodeProps.as = nodeProps.as || as

          if (imageRef) {
            innerRef = (...args) => {
              imageRef(...args)
              if (nodeProps.innerRef) {
                if (typeof nodeProps.innerRef === 'function')
                  nodeProps.innerRef(...args)
                else if (
                  typeof nodeProps.innerRef === 'object'
                  && nodeProps.innerRef.current !== void 0
                )
                  nodeProps.innerRef.current = args[0]
              }
            }
          }

          const imgProps = Object.assign({}, nodeProps, {
            alt,
            src: props.src,
            defaultSrc: props.defaultSrc,
            innerRef
          })

          nodeProps.children = (props.children || getImage)(imgProps)
          return renderNode(nodeProps, defaultCSS)
        }

        return BasicBox(boxProps)
      }
    )

    sfcProps.innerRef = innerRef
    if (supportsObjectFit) sfcProps.orientation = 'square'

    return (supportsObjectFit ? SFC : SFCWithImageProps)(sfcProps)
  }
)

Avatar.propTypes /* remove-proptypes */ = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
export default Avatar