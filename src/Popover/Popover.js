import React from 'react'
import {css} from '@emotion/core'
import {ViewportConsumer} from '@render-props/viewport'
import {loadImages} from '@render-props/image-props'
import {strictShallowEqual} from '@render-props/utils'
import emptyObj from 'empty/object'
import Breakpoint from '../Breakpoint'
import {MAX_Z_INDEX} from '../browser'
import {FlexBox} from '../Box'
import {pos} from '../Box/CSS'
import {flex} from '../Flex/CSS'
import Drop from '../Drop'
import {portalize} from '../utils'
import * as defaultTheme from './defaultTheme'
import {setDirectionStyle} from './utils'
import createComponent, {renderNode} from '../createComponent'


/**
 import {Popover, PopoverBox} from 'curls'
 <Popover fromRight enterDelay={600} leaveDelay={150}>
 {function ({popoverRef, renderPosition, show, hide, ...props}) {
    return (
      <div>
        <PopoverBox
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <Type bold color='black'>Hello</Type>
        </PopoverBox>
        <Button ref={popoverRef} onMouseEnter={show} onMouseLeave={hide}>
          Hover me
        </Button>
      </div>
    )
  }}
 </Popover>
 */
const {Consumer, Provider} = React.createContext(emptyObj)
export const PopoverConsumer = Consumer
const defaultCSS = css`
  ${flex};
  ${pos.fixed};
  z-index: ${MAX_Z_INDEX};
`
const as = 'div'
const SFC = createComponent({name: 'Popover', defaultTheme, themePath: 'popover'})

export const PopoverBox = React.forwardRef(
  function PopoverBox ({children, portal, ...props}, innerRef) {
    return (
      <Consumer children={
        function ({css: boxCSS, popoverBoxRef, style, ...transitionProps}) {
          const boxChild =
            typeof children === 'function' ? children(transitionProps) : children

          innerRef = innerRef === null ? popoverBoxRef : function (...args) {
            innerRef(...args)
            popoverBoxRef(...args)
          }

          let Component = SFC({
            ...props,
            css: [boxCSS, props.css],
            children: sfcProps => FlexBox({
              ...sfcProps,
              children: function (boxProps) {
                boxProps.as = boxProps.as || as
                boxProps.children = boxChild
                boxProps.innerRef = innerRef
                boxProps.style = {...style, ...boxProps.style}
                return renderNode(boxProps, defaultCSS)
              }
            })
          })

          return portalize(Component, portal)
        }
      }/>
    )
  }
)

class PopoverContainer extends React.Component {
  imageLoader = null
  container = null
  state = {}

  constructor (props) {
    super(props)
    this.popoverContext = {
      isVisible: props.isVisible,
      show: props.show,
      hide: props.hide,
      toggle: props.toggle,
      renderPosition: this.state.renderPosition,
      reposition: this.reposition,
      popoverRef: this.setContainerRef
    }
    this.popoverBoxContext = {
      ...this.popoverBoxContext,
      className: props.className,
      popoverBoxRef: this.setPopoverBoxRef
    }
    delete this.popoverBoxContext.popoverRef
  }

  componentDidMount () {
    if (this.props.isVisible === true) {
      this.reposition()
    }
  }

  componentDidUpdate ({width, height, scrollY, isVisible}) {
    if ((
      this.props.isVisible === true
      && this.props.isVisible !== isVisible
    ) || (
      (this.props.isVisible === true || this.state.hasRendered === true)
      && (
        width !== this.props.width
        || height !== this.props.height
        || scrollY !== this.props.scrollY
      )
    )
    ) {
      this.reposition()
    }
  }

  componentWillUnmount () {
    if (this.imageLoader !== null) {
      this.imageLoader.cancel()
    }
  }

  shouldComponentUpdate ({scrollY, width, height, ...nextProps}, nextState) {
    if (
      (this.props.isVisible === true || this.state.hasRendered === true) && (
        width !== this.props.width
        || height !== this.props.height
        || scrollY !== this.props.scrollY
      )
    ) {
      return true
    }

    const prevProps = {...this.props}
    delete prevProps.width
    delete prevProps.height
    delete prevProps.scrollY

    return (
      !strictShallowEqual(nextState, this.state)
      || !strictShallowEqual(nextProps, prevProps)
    )
  }

  setContainerRef = el => this.container = el
  setPopoverBoxRef = el => this.popoverBox = el

  setPositionState = () => {
    let {popoverDirection, theme, width, height} = this.props
    this.setState(
      setDirectionStyle(popoverDirection, this.container, this.popoverBox, {width, height})
    )
  }

  reposition = () => {
    this.imageLoader = loadImages(this.popoverBox)
    this.imageLoader.then(
      () => {
        this.setPositionState()
        this._loader = null
      }
    )

    this.setPositionState()
  }

  render () {
    if (
      this.props.isVisible !== this.popoverContext.isVisible
      || this.state.renderPosition !== this.popoverContext.renderPosition
      || this.props.css !== this.popoverBoxContext.css
    ) {
      const {renderPosition, ...style} = this.state
      this.popoverContext = {
        ...this.popoverContext,
        renderPosition,
        isVisible: this.props.isVisible,
        popoverRef: this.setContainerRef
      }
      this.popoverBoxContext = {
        ...this.popoverContext,
        style,
        css: this.props.css,
        popoverBoxRef: this.setPopoverBoxRef
      }
      delete this.popoverBoxContext.popoverRef
    }

    return (
      <Provider value={this.popoverBoxContext}>
        {this.props.children(this.popoverContext)}
      </Provider>
    )
  }
}


function ViewportPopover (props) {
  // props here can be safely mutated
  return ViewportConsumer({
    observe: props.repositionOnScroll ? void 0 : 'size',
    children: vpProps => {
      props.width = vpProps.width
      props.height = vpProps.height

      if (props.repositionOnScroll) {
        props.scrollY = vpProps.scrollY
      }

      if (props.innerRef) {
        props.ref = props.innerRef
        delete props.innerRef
      }

      return React.createElement(PopoverContainer, props)
    }
  })
}

const positions = ['fromTop', 'fromRight', 'fromBottom', 'fromLeft']

function getBreakpoints (props) {
  const keys = Object.keys(props)
  const breakpoints = []

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (positions.indexOf(key) > -1) {
      if (props[key].indexOf('@') > -1) {
        breakpoints.push()
      }
    }
  }
}

export default React.forwardRef(
  function Popover ({...props}, innerRef) {

    return (props.transition || Drop)({
      ...props,
      children: function (popoverProps) {
        popoverProps.children = props.children
        popoverProps.popoverDirection = 'fromBottom'
        popoverProps.innerRef = innerRef
        return ViewportPopover(popoverProps)
      }
    })
  }
)