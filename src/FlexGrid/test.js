import React from 'react'
import {renderFragment, renderErrorFragment} from 'test-utils'
import {FlexGrid} from './FlexGrid'

test('<FlexGrid> -> as prop', () => {
  expect(renderFragment(<FlexGrid as="span" />)).toMatchSnapshot()
})

test('<FlexGrid> -> box properties', () => {
  expect(renderFragment(<FlexGrid d="block" />)).toMatchSnapshot()
})

test('<FlexGrid> -> flex properties', () => {
  expect(renderFragment(<FlexGrid row />)).toMatchSnapshot()
})

test('<FlexGrid> -> breakpoints', () => {
  expect(renderFragment(<FlexGrid phone={false} />)).toMatchSnapshot('falsy')
  expect(
    renderFragment(<FlexGrid phone="1" tablet="1" desktop="1" />)
  ).toMatchSnapshot('string 1/[cols]')
  expect(
    renderFragment(<FlexGrid phone={1} tablet={1} desktop={1} />)
  ).toMatchSnapshot('number 1/[cols]')
  expect(
    renderFragment(<FlexGrid phone="1/4" tablet="1/8" desktop="1/12" />)
  ).toMatchSnapshot('fraction 1/[cols]')
  expect(
    renderFragment(<FlexGrid phone="1 / 4" tablet="1 / 8" desktop="1 / 12" />)
  ).toMatchSnapshot('fraction 1 / [cols]')
  expect(
    renderErrorFragment(<FlexGrid phone="1/5" />)
  ).toThrowErrorMatchingSnapshot('throws wrong col number')
  expect(
    renderErrorFragment(<FlexGrid phone="6" />)
  ).toThrowErrorMatchingSnapshot('throws over col count')
})

test('<FlexGrid> -> custom breakpoints', () => {
  const theme = {
    breakpoints: {
      mobile: 'only screen and (min-width: 0em)',
      ipad: 'only screen and (min-width: 35em)',
      bigscreen: 'only screen and (min-width: 80em)',
    },
    flexGrid: {
      columns: {
        mobile: 4,
        ipad: 8,
        bigscreen: 12,
      },
    },
  }
  expect(
    renderFragment(<FlexGrid mobile="1" ipad="1" bigscreen="1" />, theme)
  ).toMatchSnapshot('string 1/[cols]')
  expect(
    renderFragment(<FlexGrid mobile={1} ipad={1} bigscreen={1} />, theme)
  ).toMatchSnapshot('number 1/[cols]')
  expect(
    renderFragment(<FlexGrid mobile="1/4" ipad="1/8" bigscreen="1/12" />, theme)
  ).toMatchSnapshot('fraction 1/[cols]')
  expect(
    renderFragment(
      <FlexGrid mobile="1 / 4" ipad="1 / 8" bigscreen="1 / 12" />,
      theme
    )
  ).toMatchSnapshot('fraction 1 / [cols]')
  expect(
    renderErrorFragment(<FlexGrid mobile="1/5" />, theme)
  ).toThrowErrorMatchingSnapshot('throws wrong col number')
  expect(
    renderErrorFragment(<FlexGrid mobile="6" />, theme)
  ).toThrowErrorMatchingSnapshot('throws over col count')
})
