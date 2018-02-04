import {oneOfType, string, object, any, arrayOf} from 'prop-types'

const propTypes = {
  queries: oneOfType([
    string,
    object,
    arrayOf(oneOfType([string, object]))
  ]).isRequired,
  children: any.isRequired
}


export default propTypes
