import {css} from 'emotion'
import {GridBox} from '../Box'
import {pr} from '../Box/CSS'
import {fluid} from '../Flex/CSS'
import {createNode} from '../utils'


const defaultCSS = css`
  ${pr};
  ${fluid};
`
const SFC = createNode({name: 'Col', defaultCSS})


export default function Col (props) {
  return GridBox({
    ...props,
    children: function (sfcProps) {
      sfcProps.children = props.children
      return SFC(sfcProps)
    }
  })
}
