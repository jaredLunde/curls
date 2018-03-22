import {oneOfType, string, object, bool, any, arrayOf} from 'prop-types'

const propTypes = {
  queries: arrayOf(oneOfType([string, object])).isRequired,
  defaultMatches: arrayOf(bool),
  children: any.isRequired
}


export default propTypes
