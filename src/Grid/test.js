import React from 'react'
import {renderFragment, renderErrorFragment} from 'test-utils'
import {Grid} from './Grid'

test('<Grid> -> as prop', () => {
  expect(renderFragment(<Grid as="span" />)).toMatchSnapshot()
})

test('<Grid> -> has box properties', () => {
  expect(renderFragment(<Grid m="b1" />)).toMatchSnapshot()
})

test('<Grid> -> has flex properties', () => {
  expect(renderFragment(<Grid row />)).toMatchSnapshot()
})

test('<Grid> -> inline', () => {
  expect(renderFragment(<Grid inline />)).toMatchSnapshot()
})

test('<Grid> -> rows', () => {
  expect(renderFragment(<Grid rows="64" />)).toMatchSnapshot('64px')
  expect(renderFragment(<Grid rows="64 128" />)).toMatchSnapshot('64px 128px')

  let theme = {
    grid: {
      templateUnit: 'rem',
    },
  }

  expect(renderFragment(<Grid rows="1" />, theme)).toMatchSnapshot('1rem')
  expect(renderFragment(<Grid rows="1 2" />, theme)).toMatchSnapshot(
    '1rem 2rem'
  )
})

test('<Grid> -> cols', () => {
  expect(renderFragment(<Grid cols="64" />)).toMatchSnapshot('64px')
  expect(renderFragment(<Grid cols="64 128" />)).toMatchSnapshot('64px 128px')
  expect(renderFragment(<Grid cols="1fr 2fr" />)).toMatchSnapshot('1fr 2fr')

  let theme = {
    grid: {
      templateUnit: 'rem',
    },
  }

  expect(renderFragment(<Grid cols="1" />, theme)).toMatchSnapshot('1rem')
  expect(renderFragment(<Grid cols="1 2" />, theme)).toMatchSnapshot(
    '1rem 2rem'
  )
})

test('<Grid> -> autoRows', () => {
  expect(renderFragment(<Grid autoRows="64" />)).toMatchSnapshot('64px')
  expect(renderFragment(<Grid autoRows="64 128" />)).toMatchSnapshot(
    '64px 128px'
  )

  let theme = {
    grid: {
      templateUnit: 'rem',
    },
  }

  expect(renderFragment(<Grid autoRows="1" />, theme)).toMatchSnapshot('1rem')
  expect(renderFragment(<Grid autoRows="1 2" />, theme)).toMatchSnapshot(
    '1rem 2rem'
  )
})

test('<Grid> -> autoCols', () => {
  expect(renderFragment(<Grid autoCols="64" />)).toMatchSnapshot('64px')
  expect(renderFragment(<Grid autoCols="64 128" />)).toMatchSnapshot(
    '64px 128px'
  )
  expect(renderFragment(<Grid autoCols="1fr 2fr" />)).toMatchSnapshot('1fr 2fr')

  let theme = {
    grid: {
      templateUnit: 'rem',
    },
  }

  expect(renderFragment(<Grid autoCols="1" />, theme)).toMatchSnapshot('1rem')
  expect(renderFragment(<Grid autoCols="1 2" />, theme)).toMatchSnapshot(
    '1rem 2rem'
  )
})

test('<Grid> -> gap', () => {
  expect(renderFragment(<Grid gap="1" />)).toMatchSnapshot('1rem')
  expect(renderFragment(<Grid gap="1 2" />)).toMatchSnapshot('1rem 2rem')

  let theme = {
    grid: {
      gapUnit: 'px',
    },
  }

  expect(renderFragment(<Grid gap="64" />, theme)).toMatchSnapshot('64px')
  expect(renderFragment(<Grid gap="64 128" />, theme)).toMatchSnapshot(
    '64px 128px'
  )
})

test('<Grid> -> flow', () => {
  expect(renderFragment(<Grid flow="row" />)).toMatchSnapshot('row')
  expect(renderFragment(<Grid flow="column" />)).toMatchSnapshot('column')
  expect(renderErrorFragment(<Grid flow="col" />)).toThrowErrorMatchingSnapshot(
    'throws col'
  )
})

test('<Grid> -> areas', () => {
  expect(renderFragment(<Grid areas="sidebar content" />)).toMatchSnapshot(
    'sidebar content'
  )
})
