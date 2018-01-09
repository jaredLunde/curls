import React from 'react'
import Box from '../Box'


const SPAN = <span/>


export default function ({isChecked}) {
  return Box({
    p: 1,
    bg: isChecked ? 'black' : 'white',
    br: 5,
    children: SPAN
  })
}
