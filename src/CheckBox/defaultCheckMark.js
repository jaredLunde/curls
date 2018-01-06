import React from 'react'
import {FlexBox} from '../Box'


const SPAN = <span/>


export default function ({isChecked}) {
  return FlexBox({
    p: 2,
    bg: isChecked ? 'green' : 'white',
    br: 5,
    children: SPAN
  })
}