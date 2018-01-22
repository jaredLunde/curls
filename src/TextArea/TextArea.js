import createComponent from '../createComponent'
import Type from '../Type'
import propTypes from '../Input/propTypes'
import * as CSS from '../Input/CSS'
import * as defaultTheme from './defaultTheme'
import GLOBAL from './global'
const __GLOBAL = GLOBAL  // prevent tree-shaking from elimating me


const nodeType = 'textarea'
const SFC = createComponent({name: 'TextArea', defaultTheme, propTypes, CSS, themePath: 'textArea'})


export default function Input (props) {
  return SFC({
    __inputStyles: true,
    ...props,
    children: function (typeProps) {
      typeProps.nodeType = 'textarea'
      return Type(typeProps)
    }
  })
}
