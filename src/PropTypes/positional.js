import {oneOf, bool, number, string} from 'prop-types'

const pType = oneOf([bool, number, string])
export default {
  fromTop: pType,
  fromRight: pType,
  fromBottom: pType,
  fromLeft: pType,
}
