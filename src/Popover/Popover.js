import React from 'react'
import {css, cx} from 'emotion'
import WithViewport from 'react-cake/es/Viewport/WithViewport'
import createOptimized from 'react-cake/es/utils/createOptimized'
import compose from 'react-cake/es/utils/compose'
import reduceProps from 'react-cake/es/utils/reduceProps'
import loadImages from 'react-cake/es/utils/loadImages'
import Box from '../Box'
import {pf} from '../Box/CSS'
import {flex} from '../Flex/CSS'
import Drop from '../Drop'
import {getPosFromProps} from '../Slide/utils'
import * as defaultTheme from './defaultTheme'
import {setDirectionStyle} from './utils'
import {getComponentTheme} from '../utils'
import viewport from '../PropTypes/viewport'


/**
PopOver({
  delay: 200,
  fromBottom: true,
  children: function ({PopOverBox, popOverRef, show, hide, ...props}) {
    return (
      <div ref={popOverRef}>
        {PopOverBox({
          p: 5,
          bg: 'darkestGrey',
          onMouseEnter: show,
          onMouseLeave: hide,
          children: function ({isVisible, show, hide, toggle}) {
            return <Type bold white>Hello</Type>
          }
        })}

        <Button onMouseEnter={show} onMouseLeave={hide}>
          Hover me
        </Button>
      </div>
    )
  }
})
*/
const themePath = 'popOver'
const poBoxCSS = css`
  ${flex};
  ${pf};
`

class PopOverContainer extends React.PureComponent {
  imageLoader = null
  container = null
  state = {}

  componentDidMount () {
    if (this.props.isVisible === true) {
      this.reposition()
    }

    this.props.subscribe(this.setSubscription)
  }

  componentDidUpdate () {
    if (this.props.isVisible === true) {
      this.reposition()
    }
  }

  componentWillUnmount () {
    if (this.imageLoader !== null) {
      this.imageLoader.cancel()
    }

    this.props.unsubscribe(this.setSubscription)
  }

  setSubscription = () => {
    if (this.props.isVisible) {
      this.reposition()
    }
  }

  setContainerRef = el => this.container = el
  setPopOverBoxRef = el => this.popOverBox = el

  setPositionState () {
    let {popOverDirection, theme, getViewportSize} = this.props
    const direction = (
      popOverDirection
      || getComponentTheme(defaultTheme, theme, themePath).defaultDirection
    )

    this.setState(
      setDirectionStyle(direction, this.container, this.popOverBox, getViewportSize())
    )
  }

  reposition = () => {
    this.imageLoader = loadImages(this.popOverBox)
    this.imageLoader.then(
      () => {
        this.setPositionState.bind(this)()
        this._loader = null
      }
    )
  }

  render () {
    let {
      children,
      className,
      theme,
      show,
      hide,
      toggle,
      isVisible,
      ...props
    } = this.props
    props = reduceProps(props, viewport)
    theme = getComponentTheme(defaultTheme, theme, themePath)
    const poClassName = className

    const PopOverBox = ({nodeType = 'div', children, ...boxProps}) => {
      return Box({
        className: cx(poBoxCSS, className),
        p: theme.defaultPadding,
        bg: theme.defaultBg,
        br: theme.defaultBorderRadius,
        bc: theme.defaultBorderColor,
        bw: theme.defaultBorderWidth,
        bs: theme.defaultBoxShadow,
        ...boxProps,
        children: ({className, style, ...poProps}) => {
          return createOptimized(
            nodeType,
            {
              className: cx(poClassName, className),
              ref: this.setPopOverBoxRef,
              style: {...this.state, ...style},
              ...poProps
            },
            children({isVisible, reposition: this.reposition, show, hide, toggle})
          )
        }
      })
    }

    return createOptimized(
      children,
      {
        PopOverBox,
        isVisible,
        show,
        hide,
        toggle,
        ...props,
        popOverRef: this.setContainerRef
      }
    )
  }
}


const ComposedPopOver = compose([WithViewport, PopOverContainer])


export default function PopOver ({children, transitionType = Drop, ...props}) {
  const popOverDirection = getPosFromProps(props)

  return transitionType({
    ...props,
    children: function (popOverProps) {
      return createOptimized(
        ComposedPopOver,
        {
          children,
          popOverDirection,
          ...popOverProps
        }
      )
    }
  })
}
