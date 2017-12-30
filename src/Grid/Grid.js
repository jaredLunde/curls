import {css, cx} from 'react-emotion'
import createOptimized from 'react-cake/es/utils/createOptimized'
import propTypes from './propTypes'
import {getColumnWidth} from './utils'
import {getClassNames} from '../utils'

/**
Grid({
  sm: 4,
  md: 6,
  xxl: 16,
  children: function ({className}) {
    return <div className={className}/>
  }
})
*/

export default function Grid ({children, className, ...props}) {
  // {xxs, xs, sm, md, lg, xl, xxl, ...props}
  return createOptimized(
    children, {
      className: cx(getClassNames(getColumnWidth, propTypes, props), className),
      ...props
    }
  )
}


Grid.propTypes = propTypes
