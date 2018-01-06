import {Link as RouterLink} from 'react-router-dom'
import A from './A'


export default function Link (props) {
  return A({nodeType: RouterLink, ...props})
}
