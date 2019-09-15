import {boolOrString, implicitNum} from '../PropTypes'

export default {
  // Sizes
  size: boolOrString,
  // Weights
  weight: implicitNum,
  // Alignment
  aligned: boolOrString,
  // line-height
  line: boolOrString,
  // Legibility
  optimizeFor: boolOrString,
  antialias: boolOrString,
  // Color
  color: boolOrString,
  // font-family
  family: boolOrString,
  // cool
  ellipsis: boolOrString,
}
