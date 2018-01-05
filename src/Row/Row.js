import {css, cx} from 'emotion'
import {FlexBox} from '../Box'
import {pr, fw} from '../Box/CSS'
import {flex, row, wrap} from '../Flex/CSS'


const rowCSS = css`
  ${pr};
  ${fw};
  ${flex};
  ${row};
  ${wrap};
`


export default function Row (props) {
  return FlexBox({...props, className: cx(rowCSS, props.className)})
}
