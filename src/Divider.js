import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import emptyObj from 'empty/object'
import createComponent from './createComponent'
import {useBasicBox} from './Box'
import {pushCss} from './utils'


const
  defaultStyles = css`
    width: 100%;
    min-height: 1px;
    clear: both;
    position: relative;
  `

export const
  useDivider = props => useStyles('divider', emptyObj, pushCss(props, defaultStyles)),
  Divider = createComponent('div', props => useBasicBox(useDivider(props)))

Divider.defaultProps = {
  role: 'separator',
  bg: 'translucentLight'
}

if (__DEV__) {
  const boxPropTypes = require('./Box/propTypes').default
  Divider.displayName = 'Divider'
  Divider.propTypes  = boxPropTypes
}