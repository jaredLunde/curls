import {css, cx} from 'emotion'
import Box from '../Box'
import {pr, fw} from '../Box/CSS'
import {flex, row, wrap} from '../Flex/CSS'
import {createNode} from '../utils'


const defaultCSS = css`
  ${pr};
  ${fw};
  ${flex};
  ${row};
  ${wrap};
`
const SFC = createNode({name: 'Row', defaultCSS})


export default function Row (props) {
  return Box({
    ...props,
    children: function (sfcProps) {
      sfcProps.children = props.children
      return SFC(sfcProps)
    }
  })
}
