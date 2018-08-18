import {callIfExists} from '@render-props/utils'
import createComponent from '../createComponent'
import Type from '../Type'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import GLOBAL from './global'
const __GLOBAL = GLOBAL  // prevent tree-shaking from elimating me


const nodeType = 'textarea'
const SFC = createComponent({
  name: 'TextArea',
  defaultTheme,
  propTypes,
  CSS,
  themePath: 'textArea'
})


function autoResize (e) {
  if (!e.target.value) {
    e.target.style.height = ''
  }
  else {
    const nextHeight = e.target.scrollHeight
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }
}


export default function TextArea (props) {
  return SFC({
    __inputStyles: true,
    ...props,
    children: function (typeProps) {
      typeProps.nodeType = 'textarea'

      if (props.autoResize) {
        typeProps.onChange = function (...args) {
          callIfExists(props.onChange, ...args)
          autoResize(...args)
        }
      }

      typeProps.children = props.children
      return Type(typeProps)
    }
  })
}
