import React from 'react'
import {cx, css} from 'emotion'
import Toggle from 'react-cake/es/Toggle'
import {d} from '../Box/CSS'
import {flex, align, justify} from '../Flex/CSS'
import Box from '../Box'
import * as defaultTheme from './defaultTheme'
import {createComponent, renderNode} from '../utils'
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
const nodeType = 'span'
const defaultCSS = css`
  ${flex};
  ${align.center};
  ${justify.center};
  cursor: pointer;
`
const SFC = createComponent({name: 'CheckBox', defaultTheme, themePath: 'checkBox'})


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
        function CheckBoxInput (checkBoxInputProps) {
          return SFC({
            ...checkBoxInputProps,
            children: function (boxProps) {
              return Box({
                ...boxProps,
                children: function (nodeProps) {
                  const checkBoxInput = <input
                    type='checkBox'
                    name={name}
                    value={value}
                    checked={sfcProps.isChecked}
                    readOnly
                    disabled
                    className={d.none}
                  />

                  nodeProps.children = checkBoxInputProps.children({isChecked: sfcProps.isChecked})
                  nodeProps.nodeType = nodeProps.nodeType || nodeType
                  return (
                    <>
                      {renderNode(nodeProps, defaultCSS)}
                      {checkBoxInput}
                    </>
                  )
                }
              })
            }
          })
        }

        sfcProps.CheckBoxInput = CheckBoxInput
        return children(sfcProps)
      }}
    </Toggle>
  )
}
