import React from 'react'
import {css, cx} from 'emotion'
import WithViewport from 'react-cake/es/Viewport/WithViewport'
import createOptimized from 'react-cake/es/utils/createOptimized'
import compose from 'react-cake/es/utils/compose'
import reduceProps from 'react-cake/es/utils/reduceProps'
import loadImages from 'react-cake/es/utils/loadImages'
import {FlexBox} from '../Box'
import {pf} from '../Box/CSS'
import {flex} from '../Flex/CSS'
import Drop from '../Drop'
import {getPosFromProps} from '../Slide/utils'
import defaultTheme from './defaultTheme'
import {setDirectionStyle} from './utils'
import {getComponentTheme} from '../utils'
import viewport from '../PropTypes/viewport'


/**
Popover({
  delay: 200,
  fromBottom: true,
  children: function ({PopoverBox, popoverRef, show, hide, ...props}) {
    return (
      <div ref={popoverRef}>
        {PopoverBox({
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
const themePath = 'popover'
const poBoxCSS = css`
  ${flex};
  ${pf};
`

class PopoverContainer extends React.PureComponent {
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
  setPopoverBoxRef = el => this.popoverBox = el

  setPositionState () {
    let {popoverDirection, theme, getViewportSize} = this.props
    const direction = (
      popoverDirection
      || getComponentTheme(defaultTheme, theme, themePath).defaultDirection
    )

    this.setState(
      setDirectionStyle(direction, this.container, this.popoverBox, getViewportSize())
    )
  }

  reposition = () => {
    this.imageLoader = loadImages(this.popoverBox)
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

    const PopoverBox = ({nodeType = 'div', children, ...boxProps}) => {
      return FlexBox({
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
              ref: this.setPopoverBoxRef,
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
        PopoverBox,
        isVisible,
        show,
        hide,
        toggle,
        ...props,
        popoverRef: this.setContainerRef
      }
    )
  }
}


const ComposedPopover = compose([WithViewport, PopoverContainer])


export default function Popover ({children, transitionType = Drop, ...props}) {
  const popoverDirection = getPosFromProps(props)

  return transitionType({
    ...props,
    children: function (popoverProps) {
      return createOptimized(
        ComposedPopover,
        {
          children,
          popoverDirection,
          ...popoverProps
        }
      )
    }
  })
}
