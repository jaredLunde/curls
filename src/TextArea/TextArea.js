import React from 'react'
import {css} from '@emotion/core'
import {useStyles, createElement} from '@style-hooks/core'
import {Input} from '../Input/Input'
import {useBox} from '../Box'
import {useText} from '../Text'
import * as styles from './styles'


const
  defaultStyles = css`
    appearance: none;
    outline: none;
    margin: 0;
  `,
  options = {name: 'textArea', styles},
  autoResize = e => {
    if (!e.target.value)
      e.target.style.height = ''
    else {
      e.target.style.height = 'auto'
      e.target.style.height = e.target.scrollHeight + 'px'
    }
  }

export const
  useTextArea = props => useStyles(options, Object.assign({__textAreaStyles: true}, props)),
  TextArea = React.forwardRef((props, ref) => {
    props = Object.assign({css: [defaultStyles]}, props)
    let nodeProps = useBox(useText(useTextArea(props)))
    nodeProps.ref = ref

    if (props.autoResize) {
      nodeProps.onChange = e => {
        typeof props.onChange === 'function' && props.onChange(e)
        autoResize(e)
      }
    }

    return createElement('textarea', nodeProps)
  })

TextArea.defaultProps = Object.assign({}, Input.defaultProps, {
  p: 3,
  br: 3
})

if (__DEV__) {
  const
    propTypes = require('./propTypes').default,
    typePropTypes = require('../Text/propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  TextArea.displayName = 'TextArea'
  TextArea.propTypes = Object.assign({}, boxPropTypes, flexPropTypes, typePropTypes, propTypes)
}