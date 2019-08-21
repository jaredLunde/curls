import {implicitNum, boolOrString} from '../PropTypes'

export default {
  // display: inline-grid
  inline: boolOrString,
  // grid-template-rows
  rows: implicitNum,
  // grid-template-columns
  cols: implicitNum,
  // grid-auto-rows
  autoRows: implicitNum,
  // grid-auto-columns
  autoCols: implicitNum,
  // grid-template-areas
  areas: boolOrString,
  // grid-auto-flow
  flow: boolOrString,
  // grid-gap
  gap: implicitNum,
}
