import React from 'react'
import {cx, css} from 'emotion'
import createOptimized from 'react-cake/es/utils/createOptimized'
import Toggle from 'react-cake/es/Toggle'
import {dn} from '../Box/CSS'
import {flex, align, justify} from '../Flex/CSS'
import {FlexBox} from '../Box'
import propTypes from './propTypes'
import defaultTheme from './defaultTheme'
import Transitionable from '../Transitionable'
import {createComponent, getComponentTheme} from '../utils'
import defaultCheckMark from './defaultCheckMark'


/**
<CheckBox checked name='amIChecked' value='foobar'>
{
  ({CheckBoxInput, toggle, on, off, isChecked, ...props}) => (
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
const defaultCSS = css`
  ${flex};
  ${align.center};
  ${justify.center};
`
const SFC = createComponent({name: 'CheckBox', propTypes, defaultTheme, defaultCSS, themePath})


export default function CheckBox ({
  children,
  name,
  value,
  checked = false,
  ...props
}) {
  return (
    <Toggle propName='isChecked' initialValue={checked} {...props}>
      {function (sfcProps) {
        const theme = getComponentTheme(defaultTheme, sfcProps.theme, themePath)

        const CheckBoxInput = function ({
          nodeType = 'span',
          children = defaultCheckMark,
          ...checkboxInputProps
        }) {
          return FlexBox({
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
                  {createOptimized(
                    nodeType,
                    boxProps,
                    children({isChecked: sfcProps.isChecked})
                  )}
                </>
              )
            }
          })
        }
        
        sfcProps.CheckboxInput = CheckboxInput
        sfcProps.children = children

        return SFC(sfcProps)
      }}
    </Toggle>
  )
}
