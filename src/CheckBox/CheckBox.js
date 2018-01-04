import React from 'react'
import {cx} from 'emotion'
import createOptimized from 'react-cake/es/utils/createOptimized'
import Toggle from 'react-cake/es/Toggle'
import {dn} from '../Box/CSS'
import {FlexBox} from '../Box'
import propTypes from './propTypes'
import defaultTheme from './defaultTheme'
import Transitionable from '../Transitionable'
import {createSFC, getComponentTheme} from '../utils'
import defaultCheckMark from './defaultCheckMark'


/**
<CheckBox checked name='amIChecked' value='foobar'>
{
  ({CheckBoxInput, toggle, check, unCheck, isChecked, ...props}) => (
    <Type nodeType='label' bold darkGrey m='l2'>
      <CheckBoxInput p={3}>
        {function ({isChecked}) {
          return isChecked && <CheckMark color='black'/>
        }}
      </CheckBoxInput>

      Checked?
      <Type light m='l1'>
        {JSON.stringify(isChecked)}
      </Type>
    </Type>
  )
}
</Checkbox>
*/
const themePath = 'checkBox'
const CheckBoxSFC = createSFC({name: 'CheckBox', propTypes, defaultTheme, themePath})
const checkBoxControls = [
  {name: 'check', value: true},
  {name: 'unCheck', value: false}
]


export default function CheckBox ({
  children,
  name,
  value,
  checked = false,
  ...props
}) {
  return (
    <Toggle
      propName='isChecked'
      controls={checkBoxControls}
      initialValue={checked}
      {...props}
    >
      {function (sfcProps) {
        const theme = getComponentTheme(defaultTheme, sfcProps.theme, themePath)

        const CheckBoxInput = function ({
          nodeType = 'span',
          children = defaultCheckMark,
          ...checkboxInputProps
        }) {
          return FlexBox({
            flex: true,
            align: 'center',
            justify: 'center',
            p: theme.defaultPadding,
            bg: theme.defaultBg,
            br: theme.defaultBorderRadius,
            bc: theme.defaultBorderColor,
            bw: theme.defaultBorderWidth,
            ...checkboxInputProps,
            children: function (boxProps) {
              const checkBoxInput = <input
                type='checkbox'
                name={name}
                value={value}
                checked={sfcProps.isChecked}
                readOnly
                disabled
                className={dn}
              />

              return (
                <>
                  {checkBoxInput}
                  {React.createElement(
                    nodeType,
                    boxProps,
                    children({isChecked: sfcProps.isChecked})
                  )}
                </>
              )
            }
          })
        }

        return CheckBoxSFC({...sfcProps, CheckBoxInput, children})
      }}
    </Toggle>
  )
}
