import {css, cx} from 'emotion'
import Box from '../Box'
import {pr} from '../Box/CSS'
import {fluid} from '../Flex/CSS'


const colCSS = css`
  ${pr};
  ${fluid};
`


export default function Col (props) {
  return Box({...props, className: cx(colCSS, props.className)})
}
