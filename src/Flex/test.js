import {renderFragment, renderErrorFragment} from 'test-utils'
import {Flex} from './Flex'
import React from 'react'

test('<Flex> -> as prop', () => {
  expect(renderFragment(<Flex as="span" />)).toMatchSnapshot()
})

test('<Flex> -> flex', () => {
  expect(renderFragment(<Flex flex />)).toMatchSnapshot()
})

test('<Flex> -> fixed', () => {
  expect(renderFragment(<Flex fixed />)).toMatchSnapshot()
})

test('<Flex> -> fluid', () => {
  expect(renderFragment(<Flex fluid />)).toMatchSnapshot()
})

test('<Flex> -> grow', () => {
  expect(renderFragment(<Flex grow />)).toMatchSnapshot('bool')
  expect(renderFragment(<Flex grow="2" />)).toMatchSnapshot('2')
})

test('<Flex> -> shrink', () => {
  expect(renderFragment(<Flex shrink />)).toMatchSnapshot('bool')
  expect(renderFragment(<Flex shrink="2" />)).toMatchSnapshot('2')
})

test('<Flex> -> basis', () => {
  expect(renderFragment(<Flex basis="100" />)).toMatchSnapshot('100px')
  expect(renderFragment(<Flex basis="100%" />)).toMatchSnapshot('100%')
  expect(
    renderFragment(<Flex basis="100" />, {flex: {basisUnit: 'rem'}})
  ).toMatchSnapshot('100rem')
})

test('<Flex> -> order', () => {
  expect(renderFragment(<Flex order="1" />)).toMatchSnapshot('1')
})

test('<Flex> -> row', () => {
  expect(renderFragment(<Flex row />)).toMatchSnapshot('bool')
  expect(renderFragment(<Flex row="reverse" />)).toMatchSnapshot('reverse')
  expect(renderFragment(<Flex row="row" />)).toMatchSnapshot('row')
  expect(renderErrorFragment(<Flex row="foo" />)).toThrowErrorMatchingSnapshot(
    'throw foo'
  )
})

test('<Flex> -> column', () => {
  expect(renderFragment(<Flex column />)).toMatchSnapshot('bool')
  expect(renderFragment(<Flex column="reverse" />)).toMatchSnapshot('reverse')
  expect(renderFragment(<Flex column="column" />)).toMatchSnapshot('column')
  expect(
    renderErrorFragment(<Flex column="foo" />)
  ).toThrowErrorMatchingSnapshot('throw foo')
})

test('<Flex> -> wrap', () => {
  expect(renderFragment(<Flex wrap />)).toMatchSnapshot('bool')
  expect(renderFragment(<Flex wrap="no" />)).toMatchSnapshot('nowrap')
  expect(renderFragment(<Flex wrap="reverse" />)).toMatchSnapshot('reverse')
  expect(renderFragment(<Flex wrap="wrap" />)).toMatchSnapshot('wrap')
  expect(renderErrorFragment(<Flex wrap="foo" />)).toThrowErrorMatchingSnapshot(
    'throw foo'
  )
})

test('<Flex> -> justify', () => {
  const justifies = ['start', 'end', 'center', 'around', 'between']

  for (let justify of justifies)
    expect(renderFragment(<Flex justify={justify} />)).toMatchSnapshot(justify)

  expect(
    renderErrorFragment(<Flex justify="foo" />)
  ).toThrowErrorMatchingSnapshot('throw foo')
})

test('<Flex> -> align', () => {
  const aligns = ['start', 'end', 'center', 'stretch', 'baseline']

  for (let align of aligns)
    expect(renderFragment(<Flex align={align} />)).toMatchSnapshot(align)

  expect(
    renderErrorFragment(<Flex align="foo" />)
  ).toThrowErrorMatchingSnapshot('throw foo')
})

test('<Flex> -> alignContent', () => {
  const aligns = ['start', 'end', 'stretch', 'center', 'around', 'between']

  for (let align of aligns)
    expect(renderFragment(<Flex alignContent={align} />)).toMatchSnapshot(align)

  expect(
    renderErrorFragment(<Flex alignContent="foo" />)
  ).toThrowErrorMatchingSnapshot('throw foo')
})

test('<Flex> -> alignSelf', () => {
  const aligns = ['start', 'end', 'center', 'stretch', 'baseline']

  for (let align of aligns)
    expect(renderFragment(<Flex alignSelf={align} />)).toMatchSnapshot(align)

  expect(
    renderErrorFragment(<Flex alignSelf="foo" />)
  ).toThrowErrorMatchingSnapshot('throw foo')
})
