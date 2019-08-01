import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import createComponent from '../createComponent'
import {useBox} from '../Box'
import {useText} from '../Text'
import {pushCss} from '../utils'
import * as styles from './styles'


const
  defaultStyles = css`
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    &:focus {
      outline: 0
    }
    
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      height: auto;
    }
  
    &[type='search'] {
      -webkit-appearance: none;
      outline-offset: -2px;
    }
  `,
  options  = {name: 'input', styles}

export const
  useInput = props => useStyles(
    options,
    pushCss(Object.assign({__inputStyles: true}, props), defaultStyles)
  ),
  Input = createComponent('input', props => useBox(useText(useInput(props))))


if (__DEV__) {
  const
    typePropTypes = require('../Text/propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Input.displayName = 'Input'
  Input.propTypes = Object.assign({}, boxPropTypes, flexPropTypes, typePropTypes)
}