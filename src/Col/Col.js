import React from 'react'
import {css} from '@emotion/core'
import {useGridBox} from '../Box'
import {pos} from '../Box/styles'
import {renderNode} from '../createComponent'
import flexPropTypes from '../Flex/propTypes'
import propTypes from '../Box/propTypes'
import useStyles from '../useStyles'


const defaultCSS = css([
    'min-width: 0;',
    'flex-grow: 1;',
    pos.relative
  ]),
  options = {name: 'col'},
  Col = React.forwardRef(
    (props, ref) => {
      props = useStyles(props, options)
      props.useFlex = true
      props = useGridBox(props)
      props.ref = ref
      return renderNode(props, defaultCSS)
    }
  )

if (__DEV__) {
  Col.displayName = 'Col'
  Col.propTypes = Object.assign({}, flexPropTypes, propTypes)
}

export default Col
