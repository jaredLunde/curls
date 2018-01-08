import {css} from 'emotion'
import Box from '../Box'
import {pr} from '../Box/CSS'
import {fluid} from '../Flex/CSS'
import {createSFCNode} from '../utils'


const defaultCSS = css`
  ${pr};
  ${fluid};
`
const SFC = createSFCNode({name: 'Col', defaultCSS})


export default function Col (props) {
  return Box({
    ...props,
    children: function (sfcProps) {
      return SFC({children: props.children, ...sfcProps})
    }
  })
}
