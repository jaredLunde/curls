import React from 'react'
import createElement from '../createElement'
import {useBox} from '../Box'
import {useType} from '../Type'
import propTypes from './propTypes'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'
import typePropTypes from '../Type/propTypes'
import useStyles from '../useStyles'


const
  options = {name: 'textArea', styles, defaultTheme},
  autoResize = e => {
    if (!e.target.value)
      e.target.style.height = ''
    else {
      e.target.style.height = 'auto'
      e.target.style.height = e.target.scrollHeight + 'px'
    }
  },
  TextArea = React.forwardRef(
    (props, ref) => {
      let nodeProps = Object.assign({__inputStyles: true}, props)
      nodeProps = useBox(useType(useStyles(props, options)))
      nodeProps.ref = ref

      if (props.autoResize) {
        nodeProps.onChange = e => {
          typeof props.onChange === 'function' && props.onChange(e)
          autoResize(e)
        }
      }

      return createElement('textarea', nodeProps)
    }
  )

if (__DEV__) {
  TextArea.displayName = 'TextArea'
  TextArea.propTypes = Object.assign({}, boxPropTypes, flexPropTypes, typePropTypes, propTypes)
}

export default TextArea