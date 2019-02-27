import {oneOfType, string, object, bool, any, arrayOf} from 'prop-types'

export default {
  query: arrayOf(oneOfType([string, object])).isRequired,
  defaultMatches: arrayOf(bool),
  children: any.isRequired
}