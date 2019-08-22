import {renderProps} from 'test-utils'
import {act} from 'react-dom/test-utils'
import {CurlsConsumer} from './ThemeProvider'

const renderConsumer = renderProps(CurlsConsumer)

test('CurlsConsumer', () => {
  const state = renderConsumer()
  expect(state).toMatchSnapshot()
})

test('CurlsConsumer -> replaceTheme', () => {
  const state = renderConsumer({}, {box: {foo: 'bar'}})
  act(() => state.replaceTheme({box: {bar: 'baz'}}))
  expect(state.theme).toMatchSnapshot()
})

test('CurlsConsumer -> setTheme', () => {
  const state = renderConsumer({}, {box: {foo: 'bar'}})
  act(() => state.setTheme({box: {bar: 'baz'}}))
  expect(state.theme).toMatchSnapshot()
})
