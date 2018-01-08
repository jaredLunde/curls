import React from 'react'
import {FlexBox} from '../Box'


const SPAN = <span/>


export default function ({isChecked}) {
  return FlexBox({
    p: 1,
    bg: isChecked ? 'black' : 'white',
    br: 5,
    children: SPAN
  })
}
