import React from 'react'
import {cx, css} from 'emotion'
import Toggle from '@render-props/toggle'
import {d} from '../Box/CSS'
import {flex, align, justify} from '../Flex/CSS'
import {FlexBox} from '../Box'
import * as defaultTheme from './defaultTheme'
import createComponent, {renderNode} from '../createComponent'
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
  checked,
  initialChecked = false,
  ...props
}) {
  return (
    <Toggle initialValue={checked === void 0 ? initialChecked : void 0} value={checked}>
      {function (toggleContext) {
        function CheckBoxInput (checkBoxInputProps) {
          return SFC({
            ...checkBoxInputProps,
            children: function (boxProps) {
              return FlexBox({
                ...boxProps,
                children: function (nodeProps) {
                  const checkBoxInput = <input
                    type={nodeProps.type || 'checkBox'}
                    name={name}
                    value={value}
                    checked={toggleContext.value}
                    readOnly
                    disabled
                    className={d.none}
                  />
                  delete nodeProps.type
                  nodeProps.children = checkBoxInputProps.children({
                    isChecked: toggleContext.value
                  })
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

        const cxt = {...toggleContext}
        const isChecked = cxt.value
        delete cxt.value
        return children({isChecked, ...cxt, CheckBoxInput, ...props})
      }}
    </Toggle>
  )
}
