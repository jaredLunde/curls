import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import createComponent from '../createComponent'
import {useBox} from '../Box'
import {pushCss} from '../utils'
import * as styles from './styles'

const defaultStyles = css`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 0;

  & > *:not(.button):not(button):not([role='button']):first-child {
    border-top: 0;
  }

  & > *:not(.button):not(button):not([role='button']):last-child {
    border-bottom: 0;
  }

  & > *:first-child {
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
  }

  & > *:last-child {
    border-bottom-width: 0;
    border-left-width: 0;
    border-right-width: 0;
  }

  & > * {
    width: 100%;
  }

  & > img,
  & > figure,
  & > video {
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 0;
    display: block;
  }
`

export const useCard = props =>
    useStyles('card', styles, pushCss(props, defaultStyles)),
  Card = createComponent('div', props => useBox(useCard(props)))

if (__DEV__) {
  const propTypes = require('./propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Card.displayName = 'Card'
  Card.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}
