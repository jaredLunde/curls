import {css, cx} from 'emotion'
import {FlexBox} from '../Box'
import {pr, fw} from '../Box/CSS'
import {flex, row, wrap} from '../Flex/CSS'
import {createComponent} from '../utils'


const defaultCSS = css`
  ${pr};
  ${fw};
  ${flex};
  ${row};
  ${wrap};
`
const SFC = createComponent({name: 'Row', defaultCSS})


export default function Row (props) {
  return FlexBox({
    ...props,
    children: function (sfcProps) {
      sfcProps.children = props.children
      return SFC(sfcProps)
    }
  })
}
