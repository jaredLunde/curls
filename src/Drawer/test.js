import React from 'react'
import {act} from 'react-dom/test-utils'
import {render, renderProps} from 'test-utils'
import {Drawer, DrawerBox} from './Drawer'
import {useFade} from '../Fade'

const renderDrawer = renderProps(Drawer)

test('<Drawer> -> open', () => {
  const state = renderDrawer()
  expect(state).toMatchSnapshot('closed')
  act(state.open)
  expect(state).toMatchSnapshot('open')
})

test('<Drawer> -> close', () => {
  const state = renderDrawer({initiallyOpen: true})
  expect(state).toMatchSnapshot('open')
  act(state.close)
  expect(state).toMatchSnapshot('closed')
})

test('<Drawer> -> toggle', () => {
  const state = renderDrawer()
  expect(state).toMatchSnapshot('closed')
  act(state.toggle)
  expect(state).toMatchSnapshot('open')
  act(state.toggle)
  expect(state).toMatchSnapshot('closed [2]')
})

test('<Drawer> -> custom transition', () => {
  const state = renderDrawer({transition: useFade, fromBottom: true})
  expect(state).toMatchSnapshot('closed')
  act(state.open)
  expect(state).toMatchSnapshot('open')
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

test('<DrawerBox> -> closed', () => {
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

test('<DrawerBox> -> open', () => {
  let boxState = {}
  let rendered = render(
    <Drawer initiallyOpen>
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
    <Drawer initiallyOpen>
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
    <Drawer initiallyOpen>
      {() => (
        <DrawerBox data-testid="drawer-box">
          <div />
        </DrawerBox>
      )}
    </Drawer>
  )

  expect(rendered.getByTestId('drawer-box')).toMatchSnapshot()
})
