import {oneOfType, bool, number, string, func} from 'prop-types'

export const boolNumOrString = oneOfType([bool, number, string])
export const implicitNum = oneOfType([number, string])

export const positional = {
  fromTop: boolNumOrString,
  fromRight: boolNumOrString,
  fromBottom: boolNumOrString,
  fromLeft: boolNumOrString,
}

export const toggleVisibility = {
  toggle: func,
  isVisible: bool,
  show: func,
  hide: func
}

export const boolOrString = oneOfType([bool, string])
export const boolOrNum = oneOfType([bool, number, string])