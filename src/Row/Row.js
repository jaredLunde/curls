import {css, cx} from 'emotion'
import Box from '../Box'
import {pos, w} from '../Box/CSS'
import {flex, row, wrap} from '../Flex/CSS'
import {createNode} from '../utils'


const defaultCSS = css`
  ${pos.relative};
  ${w('100%')};
  ${flex};
  ${row.row};
  ${wrap.wrap};
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
