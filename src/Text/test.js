import React from 'react'
import {css} from '@emotion/core'
import {renderFragment} from 'test-utils'
import {Text} from './Text'

test('<Text> -> as prop', () => {
  expect(renderFragment(<Text as="div" />)).toMatchSnapshot()
})

test('<Text> -> box properties', () => {
  expect(renderFragment(<Text d="block" />)).toMatchSnapshot()
})

test('<Text> -> flex properties', () => {
  expect(renderFragment(<Text row />)).toMatchSnapshot()
})

test('<Text> -> weight', () => {
  const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900]

  for (let w of weights) {
    expect(renderFragment(<Text weight={w} />)).toMatchSnapshot(w)
    expect(renderFragment(<Text weight={String(w)} />)).toMatchSnapshot(
      `String ${w}`
    )
  }
})

test('<Text> -> size', () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

  for (let size of sizes)
    expect(renderFragment(<Text size={size} />)).toMatchSnapshot(size)

  for (let size of sizes)
    expect(
      renderFragment(<Text size={size} />, {text: {sizeUnit: 'px'}})
    ).toMatchSnapshot(`${size} px`)

  for (let size of sizes)
    expect(
      renderFragment(<Text size={size} />, {text: {legible: ['xl']}})
    ).toMatchSnapshot(`${size} legibility`)

  expect(renderFragment(<Text size={null} />)).toMatchSnapshot(`null`)
  expect(renderFragment(<Text size={false} />)).toMatchSnapshot(`false`)
})

test('<Text> -> scale', () => {
  // numeric
  let theme = {
    text: {
      scale: {
        sm: 0.5,
        md: 1,
        lg: 2,
      },
    },
  }

  const sizes = ['sm', 'md', 'lg']
  for (let size of sizes)
    expect(renderFragment(<Text size={size} />, theme)).toMatchSnapshot(
      `number.${size}`
    )

  // css
  theme = {
    text: {
      scale: {
        sm: css`
          font-size: 0.5rem;
        `,
        md: css`
          font-size: 1rem;
        `,
        lg: css`
          font-size: 2rem;
        `,
      },
    },
  }

  for (let size of sizes)
    expect(renderFragment(<Text size={size} />, theme)).toMatchSnapshot(
      `css.${size}`
    )

  // func
  theme = {
    text: {
      scale: {
        sm: () =>
          css`
            font-size: 0.5rem;
          `,
        md: () =>
          css`
            font-size: 1rem;
          `,
        lg: () =>
          css`
            font-size: 2rem;
          `,
      },
    },
  }

  for (let size of sizes)
    expect(renderFragment(<Text size={size} />, theme)).toMatchSnapshot(
      `fn.${size}`
    )
})

test('<Text> -> family', () => {
  expect(renderFragment(<Text family="system" />)).toMatchSnapshot('default')
  expect(
    renderFragment(<Text family="system" />, {
      text: {families: {system: 'Helvetica'}},
    })
  ).toMatchSnapshot('custom')
  expect(renderFragment(<Text family="Helvetica" />)).toMatchSnapshot(
    'Helvetica'
  )
})

test('<Text> -> alignment', () => {
  const alignments = ['left', 'center', 'right', 'justified']

  for (let a of alignments)
    expect(renderFragment(<Text aligned={a} />)).toMatchSnapshot(a)
})

test('<Text> -> antialias', () => {
  expect(renderFragment(<Text antialias />)).toMatchSnapshot('antialias')
})

test('<Text> -> ellipsis', () => {
  expect(renderFragment(<Text ellipsis />)).toMatchSnapshot('ellipsis')
})

test('<Text> -> lineHeight', () => {
  expect(renderFragment(<Text lineHeight="1.0" />)).toMatchSnapshot('1.0')
  expect(renderFragment(<Text lineHeight="1px" />)).toMatchSnapshot('1px')
  expect(renderFragment(<Text lineHeight="1em" />)).toMatchSnapshot('1em')
  expect(renderFragment(<Text lineHeight="1rem" />)).toMatchSnapshot('1rem')
})

test('<Text> -> color', () => {
  expect(renderFragment(<Text color="blue" />)).toMatchSnapshot('theme blue')
  expect(renderFragment(<Text color="#000" />)).toMatchSnapshot('#000')
})
