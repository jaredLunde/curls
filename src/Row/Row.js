import {FlexBox} from '../Box'


export default function Row (props) {
  return FlexBox({flex: true, row: true, wrap: true, pr: true, fw: true, ...props})
}
