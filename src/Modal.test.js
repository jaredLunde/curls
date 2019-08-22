import React from 'react'
import {act} from 'react-dom/test-utils'
import {render, renderProps} from 'test-utils'
import {Modal, ModalBox} from './Modal'
import {Slide} from './Slide'

const renderModal = renderProps(Modal)

test('<Modal> -> show', () => {
  const state = renderModal()
  expect(state).toMatchSnapshot('hidden')
  act(state.show)
  expect(state).toMatchSnapshot('visible')
})

test('<Modal> -> hide', () => {
  const state = renderModal({initiallyVisible: true})
  expect(state).toMatchSnapshot('visible')
  act(state.hide)
  expect(state).toMatchSnapshot('hidden')
})

test('<Modal> -> toggle', () => {
  const state = renderModal()
  expect(state).toMatchSnapshot('hidden')
  act(state.toggle)
  expect(state).toMatchSnapshot('visible')
  act(state.toggle)
  expect(state).toMatchSnapshot('hidden [2]')
})

test('<Modal> -> custom transition', () => {
  const state = renderModal({transition: Slide, fromBottom: true})
  expect(state).toMatchSnapshot('hidden')
  act(state.show)
  expect(state).toMatchSnapshot('visible')
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

test('<ModalBox> -> hidden', () => {
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

test('<ModalBox> -> visible', () => {
  let boxState = {}
  let rendered = render(
    <Modal initiallyVisible>
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
    <Modal initiallyVisible>
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
    <Modal initiallyVisible>
      {() => (
        <ModalBox data-testid="modal-box">
          <div />
        </ModalBox>
      )}
    </Modal>
  )

  expect(rendered.getByTestId('modal-box')).toMatchSnapshot()
})
