import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import useStyles from '../useStyles'


const options = {name: 'flex', defaultTheme, styles}
export const useFlex = props => useStyles(props, options)