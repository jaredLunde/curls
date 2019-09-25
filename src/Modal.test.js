import React from 'react'
import {act} from 'react-dom/test-utils'
import {render, renderProps} from 'test-utils'
import {Modal, ModalBox} from './Modal'
import {Slide} from './Slide'

const renderModal = renderProps(Modal)

test('<Modal> -> show', () => {
  const state = renderModal()
  expect(state).toMatchSnapshot('closed')
  act(state.show)
  expect(state).toMatchSnapshot('open')
})

test('<Modal> -> hide', () => {
  const state = renderModal({initialOpen: true})
  expect(state).toMatchSnapshot('open')
  act(state.hide)
  expect(state).toMatchSnapshot('closed')
})

test('<Modal> -> toggle', () => {
  const state = renderModal()
  expect(state).toMatchSnapshot('closed')
  act(state.toggle)
  expect(state).toMatchSnapshot('open')
  act(state.toggle)
  expect(state).toMatchSnapshot('closed [2]')
})

test('<Modal> -> custom transition', () => {
  const state = renderModal({transition: Slide, fromBottom: true})
  expect(state).toMatchSnapshot('closed')
  act(state.show)
  expect(state).toMatchSnapshot('open')
})

test('<ModalBox> -> as prop', () => {
  let boxState = {}
  let rendered = render(
    <Modal>
      {() => (
        <ModalBox as="span" data-testid="modal-box">
          {cxt => {
            Object.assign(boxState, cxt)
            return null
          }}
        </ModalBox>
      )}
    </Modal>
  )

  expect(rendered.getByTestId('modal-box')).toMatchSnapshot()
})

test('<ModalBox> -> closed', () => {
  let boxState = {}
  let rendered = render(
    <Modal>
      {() => (
        <ModalBox data-testid="modal-box">
          {cxt => {
            Object.assign(boxState, cxt)
            return null
          }}
        </ModalBox>
      )}
    </Modal>
  )

  expect(rendered.getByTestId('modal-box')).toMatchSnapshot()
})

test('<ModalBox> -> open', () => {
  let boxState = {}
  let rendered = render(
    <Modal initialOpen>
      {() => (
        <ModalBox data-testid="modal-box">
          {cxt => {
            Object.assign(boxState, cxt)
            return null
          }}
        </ModalBox>
      )}
    </Modal>
  )

  expect(rendered.getByTestId('modal-box')).toMatchSnapshot()
})

test('<ModalBox> -> box properties', () => {
  let boxState = {}
  let rendered = render(
    <Modal initialOpen>
      {() => (
        <ModalBox m="b3" data-testid="modal-box">
          {cxt => {
            Object.assign(boxState, cxt)
            return null
          }}
        </ModalBox>
      )}
    </Modal>
  )

  expect(rendered.getByTestId('modal-box')).toMatchSnapshot()
})

test('<ModalBox> -> element child', () => {
  let rendered = render(
    <Modal initialOpen>
      {() => (
        <ModalBox data-testid="modal-box">
          <div />
        </ModalBox>
      )}
    </Modal>
  )

  expect(rendered.getByTestId('modal-box')).toMatchSnapshot()
})
