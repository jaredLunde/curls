import React from 'react'
import {css} from '@emotion/core'
import {useBox} from './Box'
import {useFlexGrid} from './FlexGrid'
import createComponent from './createComponent'


const defaultStyles = css`
  min-width: 0;
  flex-grow: 1;
  position: relative;
`

export const
  Col = createComponent(
    'div',
    props => useBox(useFlexGrid(Object.assign({useFlex: true}, props), options)),
    defaultStyles
  )

if (__DEV__) {
  const
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Col.displayName = 'Col'
  Col.propTypes = Object.assign({}, flexPropTypes, boxPropTypes)
}
