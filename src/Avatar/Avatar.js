import {css} from 'emotion'
import ImageStat from 'react-cake/es/ImageStat'
import {BasicBox} from '../Box'
import {pos, d, ov} from '../Box/CSS'
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
  ${d.inlineBlock};
  text-align: center;
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
const SFCWithImageStat = function (props) {
  return (
    <ImageStat>
      {function (statContext) {
        return SFC({...statContext, ...props})
      }}
    </ImageStat>
  )
}
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

  return (supportsObjectFit ? SFC : SFCWithImageStat)(sfcProps)
}
