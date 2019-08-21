import React from 'react'
import {css} from '@emotion/core'
import {renderFragment, renderErrorFragment} from 'test-utils'
import {Box, BasicBox} from './Box'

test('<Box> -> as prop', () => {
  expect(renderFragment(<Box as="span" />)).toMatchSnapshot()
})

test('<BasicBox> -> as prop', () => {
  expect(renderFragment(<BasicBox as="span" />)).toMatchSnapshot()
})

test('<Box> -> has flex properties', () => {
  expect(renderFragment(<Box row />)).toMatchSnapshot()
})

test('<Box> -> ov', () => {
  const overflows = [
    'auto',
    'autoX',
    'autoY',
    'hidden',
    'hiddenX',
    'hiddenY',
    'scroll',
    'scrollX',
    'scrollY',
    'touch',
  ]

  for (let ov of overflows)
    expect(renderFragment(<Box ov={ov} />)).toMatchSnapshot(ov)

  expect(renderFragment(<Box ov="autoY hiddenX touch" />)).toMatchSnapshot(
    'autoY hiddenX touch'
  )
  expect(renderFragment(<Box ov="autoY    hiddenX" />)).toMatchSnapshot(
    'autoY    hiddenX'
  )
})

test('<Box> -> z', () => {
  expect(renderFragment(<Box z="1000" />)).toMatchSnapshot()
})

test('<Box> -> sh', () => {
  expect(renderFragment(<Box sh="0" />)).toMatchSnapshot()
  expect(renderFragment(<Box sh={0} />)).toMatchSnapshot()
  expect(renderFragment(<Box sh="4" />)).toMatchSnapshot()
  const theme = {
    box: {
      getBoxShadow: v => css`
        box-shadow: 0 ${v}rem rgba(0, 0, 0, 0.12);
      `,
    },
  }
  expect(renderFragment(<Box sh="4" />, theme)).toMatchSnapshot()
})

test('<Box> -> bg', () => {
  expect(renderFragment(<Box bg="blue" />)).toMatchSnapshot()
  const theme = {
    colors: {
      blue: '#1ac',
    },
  }
  expect(renderFragment(<Box bg="blue" />, theme)).toMatchSnapshot()
  expect(renderFragment(<Box bg="#ccc" />, theme)).toMatchSnapshot()
})

test('<Box> -> bc', () => {
  expect(renderFragment(<Box bc="blue" />)).toMatchSnapshot()
  const theme = {
    colors: {
      blue: '#1ac',
    },
  }
  expect(renderFragment(<Box bc="blue" />, theme)).toMatchSnapshot()
  expect(renderFragment(<Box bc="#ccc" />, theme)).toMatchSnapshot()
})

test('<Box> -> w', () => {
  expect(renderFragment(<Box w="100" />)).toMatchSnapshot()
  expect(renderFragment(<Box w={100} />)).toMatchSnapshot()
  expect(renderFragment(<Box w="100%" />)).toMatchSnapshot()
  const theme = {
    sizeUnit: 'rem',
  }
  expect(renderFragment(<Box w="100" />, theme)).toMatchSnapshot()
})

test('<Box> -> h', () => {
  expect(renderFragment(<Box h="100" />)).toMatchSnapshot()
  expect(renderFragment(<Box h={100} />)).toMatchSnapshot()
  expect(renderFragment(<Box h="100%" />)).toMatchSnapshot()
  const theme = {
    sizeUnit: 'rem',
  }
  expect(renderFragment(<Box h="100" />, theme)).toMatchSnapshot()
})

test('<Box> -> minW', () => {
  expect(renderFragment(<Box minW="100" />)).toMatchSnapshot()
  expect(renderFragment(<Box minW={100} />)).toMatchSnapshot()
  expect(renderFragment(<Box minW="100%" />)).toMatchSnapshot()
  const theme = {
    sizeUnit: 'rem',
  }
  expect(renderFragment(<Box minW="100" />, theme)).toMatchSnapshot()
})

test('<Box> -> maxW', () => {
  expect(renderFragment(<Box maxW="100" />)).toMatchSnapshot()
  expect(renderFragment(<Box maxW={100} />)).toMatchSnapshot()
  expect(renderFragment(<Box maxW="100%" />)).toMatchSnapshot()
  const theme = {
    sizeUnit: 'rem',
  }
  expect(renderFragment(<Box maxW="100" />, theme)).toMatchSnapshot()
})

test('<Box> -> minH', () => {
  expect(renderFragment(<Box minH="100" />)).toMatchSnapshot()
  expect(renderFragment(<Box minH={100} />)).toMatchSnapshot()
  expect(renderFragment(<Box minH="100%" />)).toMatchSnapshot()
  const theme = {
    sizeUnit: 'rem',
  }
  expect(renderFragment(<Box minH="100" />, theme)).toMatchSnapshot()
})

test('<Box> -> maxH', () => {
  expect(renderFragment(<Box maxH="100" />)).toMatchSnapshot()
  expect(renderFragment(<Box maxH={100} />)).toMatchSnapshot()
  expect(renderFragment(<Box maxH="100%" />)).toMatchSnapshot()
  const theme = {
    sizeUnit: 'rem',
  }
  expect(renderFragment(<Box maxH="100" />, theme)).toMatchSnapshot()
})

test('<Box> -> t', () => {
  expect(renderFragment(<Box t="100" />)).toMatchSnapshot()
  expect(renderFragment(<Box t={100} />)).toMatchSnapshot()
  expect(renderFragment(<Box t="100%" />)).toMatchSnapshot()
  const theme = {
    box: {
      posUnit: 'rem',
    },
  }
  expect(renderFragment(<Box t="100" />, theme)).toMatchSnapshot()
})

test('<Box> -> r', () => {
  expect(renderFragment(<Box r="100" />)).toMatchSnapshot()
  expect(renderFragment(<Box r={100} />)).toMatchSnapshot()
  expect(renderFragment(<Box r="100%" />)).toMatchSnapshot()
  const theme = {
    box: {
      posUnit: 'rem',
    },
  }
  expect(renderFragment(<Box r="100" />, theme)).toMatchSnapshot()
})

test('<Box> -> b', () => {
  expect(renderFragment(<Box b="100" />)).toMatchSnapshot()
  expect(renderFragment(<Box b={100} />)).toMatchSnapshot()
  expect(renderFragment(<Box b="100%" />)).toMatchSnapshot()
  const theme = {
    box: {
      posUnit: 'rem',
    },
  }
  expect(renderFragment(<Box b="100" />, theme)).toMatchSnapshot()
})

test('<Box> -> l', () => {
  expect(renderFragment(<Box l="100" />)).toMatchSnapshot()
  expect(renderFragment(<Box l={100} />)).toMatchSnapshot()
  expect(renderFragment(<Box l="100%" />)).toMatchSnapshot()
  const theme = {
    box: {
      posUnit: 'rem',
    },
  }
  expect(renderFragment(<Box l="100" />, theme)).toMatchSnapshot()
})

test('<Box> -> pos', () => {
  const positions = [
    'relative',
    'absolute',
    'fixed',
    'sticky',
    'static',
    'unset',
    'initial',
    'inherit',
  ]

  for (let pos of positions)
    expect(renderFragment(<Box pos={pos} />)).toMatchSnapshot(pos)

  expect(renderErrorFragment(<Box pos="throw" />)
  ).toThrowErrorMatchingSnapshot()
})

test('<Box> -> d', () => {
  const displays = [
    'block',
    'inlineBlock',
    'flex',
    'inlineFlex',
    'inline',
    'grid',
    'inlineGrid',
    'table',
    'inlineTable',
    'tableCell',
    'tableRow',
    'tableColumn',
    'contents',
    'listItem',
    'none',
  ]

  for (let d of displays)
    expect(renderFragment(<Box d={d} />)).toMatchSnapshot(d)

  expect(renderErrorFragment(<Box d="throw" />)).toThrowErrorMatchingSnapshot()
})

test('<Box> -> bw', () => {
  const directions = ['', 't', 'r', 'b', 'l', 'y', 'x']

  for (let d of directions)
    expect(renderFragment(<Box bw={`${d}1`} />)).toMatchSnapshot(`${d}1`)

  expect(renderFragment(<Box bw={`b1 t1`} />)).toMatchSnapshot('b1 t1')
  expect(renderFragment(<Box bw={`b1   t1`} />)).toMatchSnapshot('b1   t1')
  expect(renderFragment(<Box bw={`1 t2`} />)).toMatchSnapshot('1 t2')
  expect(renderErrorFragment(<Box bw="p1" />)).toThrowErrorMatchingSnapshot(
    'throws direction'
  )
  expect(renderErrorFragment(<Box bw="t100" />)).toThrowErrorMatchingSnapshot(
    'throws scale direction'
  )
  expect(renderErrorFragment(<Box bw="100" />)).toThrowErrorMatchingSnapshot(
    'throws scale'
  )

  const theme = {
    box: {
      borderWidthUnit: 'rem',
      borderWidthScale: [0.5, 1, 2],
    },
  }

  expect(renderFragment(<Box bw="0" />, theme)).toMatchSnapshot('0.5rem')
})

test('<Box> -> br', () => {
  const directions = ['', 't', 'r', 'b', 'l', 'tl', 'tr', 'br', 'bl']

  for (let d of directions)
    expect(renderFragment(<Box br={`${d}1`} />)).toMatchSnapshot(`${d}1`)

  expect(renderFragment(<Box br="b1 t1" />)).toMatchSnapshot('b1 t1')
  expect(renderFragment(<Box br="b1   t1" />)).toMatchSnapshot('b1   t1')
  expect(renderFragment(<Box br="1 t2" />)).toMatchSnapshot('1 t2')
  expect(renderErrorFragment(<Box br="p1" />)).toThrowErrorMatchingSnapshot(
    'throws direction'
  )
  expect(renderErrorFragment(<Box br="t100" />)).toThrowErrorMatchingSnapshot(
    'throws scale direction'
  )
  expect(renderErrorFragment(<Box br="100" />)).toThrowErrorMatchingSnapshot(
    'throws scale'
  )

  const theme = {
    box: {
      borderRadiusUnit: 'px',
      borderRadiusScale: [0.5, 1, 2],
    },
  }

  expect(renderFragment(<Box br="0" />, theme)).toMatchSnapshot('0.5px')
})

test('<Box> -> m', () => {
  const directions = ['', 't', 'r', 'b', 'l', 'y', 'x']

  for (let d of directions)
    expect(renderFragment(<Box m={`${d}1`} />)).toMatchSnapshot(`${d}1`)

  expect(renderFragment(<Box m={`b1 t1`} />)).toMatchSnapshot('b1 t1')
  expect(renderFragment(<Box m={`b1   t1`} />)).toMatchSnapshot('b1   t1')
  expect(renderFragment(<Box m={`1 t2`} />)).toMatchSnapshot('1 t2')
  expect(renderFragment(<Box m="auto" />)).toMatchSnapshot('auto')
  expect(renderFragment(<Box m="xAuto" />)).toMatchSnapshot('xAuto')
  expect(renderFragment(<Box m="yAuto" />)).toMatchSnapshot('yAuto')
  expect(renderErrorFragment(<Box m="p1" />)).toThrowErrorMatchingSnapshot(
    'throws direction'
  )
  expect(renderErrorFragment(<Box m="t100" />)).toThrowErrorMatchingSnapshot(
    'throws scale direction'
  )
  expect(renderErrorFragment(<Box m="100" />)).toThrowErrorMatchingSnapshot(
    'throws scale'
  )

  const theme = {
    spacingUnit: 'px',
    spacingScale: [3, 4, 5],
  }

  expect(renderFragment(<Box m="0" />, theme)).toMatchSnapshot('3px')
})

test('<Box> -> p', () => {
  const directions = ['', 't', 'r', 'b', 'l', 'y', 'x']

  for (let d of directions)
    expect(renderFragment(<Box p={`${d}1`} />)).toMatchSnapshot(`${d}1`)

  expect(renderFragment(<Box p={`b1 t1`} />)).toMatchSnapshot('b1 t1')
  expect(renderFragment(<Box p={`b1   t1`} />)).toMatchSnapshot('b1   t1')
  expect(renderFragment(<Box p={`1 t2`} />)).toMatchSnapshot('1 t2')
  expect(renderErrorFragment(<Box p="p1" />)).toThrowErrorMatchingSnapshot(
    'throws direction'
  )
  expect(renderErrorFragment(<Box p="t100" />)).toThrowErrorMatchingSnapshot(
    'throws scale direction'
  )
  expect(renderErrorFragment(<Box p="100" />)).toThrowErrorMatchingSnapshot(
    'throws scale'
  )

  const theme = {
    spacingUnit: 'px',
    spacingScale: [3, 4, 5],
  }

  expect(renderFragment(<Box p="0" />, theme)).toMatchSnapshot('3px')
})
