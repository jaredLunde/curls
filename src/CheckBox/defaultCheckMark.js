import React from 'react'
import Box from '../Box'


const SPAN = <span/>


export default function ({isChecked}) {
  return Box({
    bg: isChecked ? 'black' : 'white',
    br: 5,
    fw: true,
    fh: true,
    children: SPAN
  })
}
