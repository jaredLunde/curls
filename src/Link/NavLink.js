import {NavLink} from 'react-router-dom'
import A from './A'


export default function NavLink (props) {
  return A({nodeType: NavLink, ...props})
}
