import React from 'react'
import createElement from '../createElement'
import {useBox} from '../Box'
import {useType} from '../Type'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
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
  const
    propTypes = require('./propTypes').default,
    typePropTypes = require('../Type/propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  TextArea.displayName = 'TextArea'
  TextArea.propTypes = Object.assign({}, boxPropTypes, flexPropTypes, typePropTypes, propTypes)
}

export default TextArea