require('browser-env')()
import test from 'ava'
import createElement from './createElement'


test('default', t => {
  const element = createElement('div', {})
  t.is(element.type, 'div')
})

test('override default w/ as prop', t => {
  let
    props = {as: 'span'},
    element = createElement('div', props)

  t.is(element.type, 'span')
  t.false(element.props.hasOwnProperty('as'))
})

test('override props.children w/ children argument', t => {
  let
    childElement = createElement('div', {}),
    element = createElement('div', {children: createElement('div', {})}, childElement)

  // normal
  t.is(element.type, 'div')
  t.is(element.props.children, childElement)
  // 'as' override
  element = createElement('div', {as: 'span'}, childElement)
  t.is(element.type, 'span')
  t.is(element.props.children, childElement)

})