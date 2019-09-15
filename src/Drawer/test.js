import React from 'react'
import {act} from 'react-dom/test-utils'
import {render, renderProps} from 'test-utils'
import {Drawer, DrawerBox} from './Drawer'
import {useFade} from '../Fade'

const renderDrawer = renderProps(Drawer)

test('<Drawer> -> show', () => {
  const state = renderDrawer()
  expect(state).toMatchSnapshot('hidden')
  act(state.show)
  expect(state).toMatchSnapshot('visible')
})

test('<Drawer> -> hide', () => {
  const state = renderDrawer({initiallyVisible: true})
  expect(state).toMatchSnapshot('visible')
  act(state.hide)
  expect(state).toMatchSnapshot('hidden')
})

test('<Drawer> -> toggle', () => {
  const state = renderDrawer()
  expect(state).toMatchSnapshot('hidden')
  act(state.toggle)
  expect(state).toMatchSnapshot('visible')
  act(state.toggle)
  expect(state).toMatchSnapshot('hidden [2]')
})

test('<Drawer> -> custom transition', () => {
  const state = renderDrawer({transition: useFade, fromBottom: true})
  expect(state).toMatchSnapshot('hidden')
  act(state.show)
  expect(state).toMatchSnapshot('visible')
})

test('<DrawerBox> -> as prop', () => {
  let boxState = {}
  let rendered = render(
    <Drawer>
      {() => (
        <DrawerBox as="span" data-testid="drawer-box">
          {cxt => {
            Object.assign(boxState, cxt)
            return null
          }}
        </DrawerBox>
      )}
    </Drawer>
  )

  expect(rendered.getByTestId('drawer-box')).toMatchSnapshot()
})

test('<DrawerBox> -> hidden', () => {
  let boxState = {}
  let rendered = render(
    <Drawer>
      {() => (
        <DrawerBox data-testid="drawer-box">
          {cxt => {
            Object.assign(boxState, cxt)
            return null
          }}
        </DrawerBox>
      )}
    </Drawer>
  )

  expect(rendered.getByTestId('drawer-box')).toMatchSnapshot()
})

test('<DrawerBox> -> visible', () => {
  let boxState = {}
  let rendered = render(
    <Drawer initiallyVisible>
      {() => (
        <DrawerBox data-testid="drawer-box">
          {cxt => {
            Object.assign(boxState, cxt)
            return null
          }}
        </DrawerBox>
      )}
    </Drawer>
  )

  expect(rendered.getByTestId('drawer-box')).toMatchSnapshot()
})

test('<DrawerBox> -> box properties', () => {
  let boxState = {}
  let rendered = render(
    <Drawer initiallyVisible>
      {() => (
        <DrawerBox m="b3" data-testid="drawer-box">
          {cxt => {
            Object.assign(boxState, cxt)
            return null
          }}
        </DrawerBox>
      )}
    </Drawer>
  )

  expect(rendered.getByTestId('drawer-box')).toMatchSnapshot()
})

test('<DrawerBox> -> element child', () => {
  let rendered = render(
    <Drawer initiallyVisible>
      {() => (
        <DrawerBox data-testid="drawer-box">
          <div />
        </DrawerBox>
      )}
    </Drawer>
  )

  expect(rendered.getByTestId('drawer-box')).toMatchSnapshot()
})
