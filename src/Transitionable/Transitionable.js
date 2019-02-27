import propTypes from './propTypes'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import createComponent from '../createComponent'


const Transitionable = createComponent({name: 'transitionable', styles, defaultTheme})
Transitionable.propTypes /* remove-proptypes */ = propTypes
export default Transitionable