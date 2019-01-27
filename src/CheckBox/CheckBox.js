// @jsx jsx
import {jsx, css} from '@emotion/core'
import React from 'react'
import Toggle from '@render-props/toggle'
import {d} from '../Box/CSS'
import {flex, align, justify} from '../Flex/CSS'
import {FlexBox} from '../Box'
import * as defaultTheme from './defaultTheme'
import createComponent, {renderNode} from '../createComponent'


/**
<CheckBox checked name='amIChecked' value='foobar'>
{
  ({CheckBoxInput, toggle, on, off, isChecked, ...props}) => (
    <Type as='label' bold darkGrey m='l2'>
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
const as = 'span'
const defaultCSS = css`
  ${flex};
  ${align.center};
  ${justify.center};
  cursor: pointer;
`
const SFC = createComponent({name: 'CheckBox', defaultTheme, themePath: 'checkBox'})


export default React.forwardRef(
  function CheckBox (
    {
      children,
      name,
      value,
      checked,
      onChange,
      initialChecked = false,
      ...props
    },
    innerRef
  ) {
    return (
      <Toggle
        initialValue={checked === void 0 ? initialChecked : void 0}
        value={checked}
        onChange={onChange}
      >
        {function (toggleContext) {
          function CheckBoxInput (checkBoxInputProps) {
            return SFC({
              innerRef,
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
                      css={d.none}
                    />
                    delete nodeProps.type
                    nodeProps.children = checkBoxInputProps.children({
                      isChecked: toggleContext.value
                    })
                    nodeProps.as = nodeProps.as || as

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
)
