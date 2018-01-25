export default `
import PropTypes from 'prop-types'
import {css} from 'emotion'

// creates a render prop component
const MyComponent = createComponent({
  name: 'MyComponent',
  CSS: {
    foo: css\`foo: bar;\`,
    bar: (value, theme) => {
      return css\`bar: \${theme.bar[value]}\`
    }
  },
  propTypes: {
    foo: PropTypes.bool,
    bar: PropTypes.string
  },
  defaultTheme: {
    bar: {
      foobar: 1
    }
  },
  themePath: 'myComponent'
})

// creates a <div> out of your render prop component
function MyComponentAsDiv (props) {
  return (
    <MyComponent>
      {function ({className}) {
        return (
          <div className={className}>
            Hello
          </div>
        )
      }}
    </MyComponent>
  )
}

// uses the <div> component wrapped in a render prop
class SomeView extends React.Component {
  render () {
    return (
      <MyComponentAsDiv foo bar='foobar'/>
    )

    /**
    <div class='css-some-emotion-class'>
      Hello
    </div>
    */
  }
}
`
