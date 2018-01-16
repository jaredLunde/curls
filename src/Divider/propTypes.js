import {oneOf, number, string} from 'prop-types'


export default {
  thickness: oneOf([number, string])
}
