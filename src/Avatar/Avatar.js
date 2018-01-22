import {css} from 'emotion'
import ImageStat from 'react-cake/es/ImageStat'
import compose from 'react-cake/es/utils/compose'
import Box from '../Box'
import {pos, ov} from '../Box/CSS'
import {flex, align, justify} from '../Flex/CSS'
import createComponent, {renderNode} from '../createComponent'
import {supportsCSS} from '../utils'
import * as CSS from './CSS'
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


const nodeType = 'span'
const defaultCSS = css`
  ${flex}
  ${align.center}
  ${justify.center}
  ${pos.relative}
  ${ov('hidden')};

  & > img {
    object-fit: cover;
  }
`
const SFC = createComponent({
  name: 'Avatar',
  propTypes,
  defaultTheme,
  CSS,
  themePath: 'avatar'
})
const SFCWithImageStat = compose([ImageStat, SFC])
const supportsObjectFit = supportsCSS('object-fit')


export default function Avatar (props) {
  const sfcProps = {
    ...props,
    children: function (boxProps) {
      // adds child prop for 'Box' and rendering the avatar node
      boxProps.children = function (nodeProps) {
        nodeProps.nodeType = nodeProps.nodeType || nodeType
        const innerRef = nodeProps.imageRef
        delete nodeProps.imageRef

        nodeProps.children = function ({...imgProps}) {
          imgProps.src = props.src
          imgProps.defaultSrc = props.defaultSrc
          imgProps.innerRef = innerRef

          return (props.children || getImage)(imgProps)
        }

        return renderNode(nodeProps, defaultCSS)
      }

      return Box(boxProps)
    }
  }

  if (supportsObjectFit) {
    sfcProps.orientation = 'square'
  }

  return (supportsObjectFit ? SFC : SFCWithImageStat)(sfcProps)
}
