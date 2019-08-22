import {objectWithoutProps} from './objectWithoutProps'

test('objectWithoutProps', () => {
  expect(objectWithoutProps({foo: 'bar', bar: 'baz'}, {bar: 1})).toStrictEqual({
    foo: 'bar',
  })
})
