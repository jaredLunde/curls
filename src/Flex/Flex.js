import propTypes from './propTypes'
import * as styles from './styles'
import createComponent from '../createComponent'
import * as defaultTheme from './defaultTheme'


const Flex = createComponent({name: 'flex', styles, defaultTheme})
Flex.propTypes = propTypes

export default Flex