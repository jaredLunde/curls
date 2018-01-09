import {oneOfType, string, object, any, arrayOf} from 'prop-types'


export default {
  queries: oneOfType([
    string,
    object,
    arrayOf(oneOfType([string, object]))
  ]).isRequired,
  children: any.isRequired
}
