import {css, cx} from 'emotion'
import {FlexBox} from '../Box'
import {pr, fw} from '../Box/CSS'
import {flex, row, wrap} from '../Flex/CSS'
import {createSFCNode} from '../utils'


const defaultCSS = css`
  ${pr};
  ${fw};
  ${flex};
  ${row};
  ${wrap};
`
const SFC = createSFCNode({name: 'Row', defaultCSS})


export default function Row (props) {
  return FlexBox({
    ...props,
    children: function (sfcProps) {
      return SFC({children: props.children, ...sfcProps})
    }
  })
}
