import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import createComponent from '../createComponent'
import {useBox} from '../Box'
import {pushCss} from '../utils'
import * as styles from './styles'

const defaultStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 0;
  color: currentColor;
  cursor: pointer;
  overflow: visible;
  padding: 0;
  margin: 0;
  line-height: 1;
  user-select: none;
  text-align: inherit;

  &::-moz-focus-inner {
    border: 0;
    margin: 0;
    padding: 0;
  }
`

export const useButton = props =>
    useStyles(
      'button',
      styles,
      pushCss(
        Object.assign({__buttonStyles: true, role: 'button'}, props),
        defaultStyles
      )
    ),
  Button = createComponent('button', props => useBox(useButton(props)))

if (__DEV__) {
  const propTypes = require('./propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Button.displayName = 'Button'
  Button.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}
