import React from 'react'
import {css} from '@emotion/core'
import {useBox} from './Box'
import createComponent from './createComponent'


const
  defaultStyles = css`
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
  `

export const
  Row = createComponent('div', useBox, defaultStyles)

if (__DEV__) {
  const
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Row.displayName = 'Row'
  Row.propTypes = Object.assign({}, boxPropTypes, flexPropTypes)
}
