import React from 'react'
import {css, cx} from 'emotion'
import {ViewportConsumer} from '@render-props/viewport'
import {loadImages} from '@render-props/image-props'
import {strictShallowEqual} from '@render-props/utils'
import emptyObj from 'empty/object'
import {maxZIndex} from '../browser'
import {FlexBox} from '../Box'
import {pos} from '../Box/CSS'
import {flex} from '../Flex/CSS'
import Drop from '../Drop'
import {portalize} from '../utils'
import {getPosFromProps} from '../Slide/utils'
import * as defaultTheme from './defaultTheme'
import {setDirectionStyle} from './utils'
import createComponent, {renderNode} from '../createComponent'


/**
 import {PopOver, PopOverBox} from 'curls'
 <PopOver fromRight enterDelay={600} leaveDelay={150}>
 {function ({popOverRef, renderPosition, show, hide, ...props}) {
    return (
      <div>
        <PopOverBox
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <Type bold color='black'>Hello</Type>
        </PopOverBox>
        <Button ref={popOverRef} onMouseEnter={show} onMouseLeave={hide}>
          Hover me
        </Button>
      </div>
    )
  }}
 </PopOver>
 */
const {Consumer, Provider} = React.createContext(emptyObj)
export const PopOverConsumer = Consumer
const defaultCSS = css`
  ${flex};
  ${pos.fixed};
  ${maxZIndex};
`
const nodeType = 'div'
const SFC = createComponent({name: 'PopOver', defaultTheme, themePath: 'popOver'})

export const PopOverBox = React.forwardRef(
  function PopOverBox (
    {children, portal, ...props},
    innerRef
  ) {
    return <Consumer children={
      function ({className, popOverBoxRef, style, ...transitionProps}) {
        const boxChild =
          typeof children === 'function' ? children(transitionProps) : children

        innerRef = innerRef === null ? popOverBoxRef : function (...args) {
          innerRef(...args)
          popOverBoxRef(...args)
        }

        let Component = SFC({
          ...props,
          className: cx(className, props.className),
          children: sfcProps => FlexBox({
            ...sfcProps,
            children: function (boxProps) {
              boxProps.nodeType = boxProps.nodeType || nodeType
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
  }
)

class PopOverContainer extends React.Component {
  imageLoader = null
  container = null
  state = {}

  constructor (props) {
    super(props)
    this.popOverContext = {
      isVisible: props.isVisible,
      show: props.show,
      hide: props.hide,
      toggle: props.toggle,
      renderPosition: this.state.renderPosition,
      reposition: this.reposition,
      popOverRef: this.setContainerRef
    }
    this.popOverBoxContext = {
      ...this.popOverBoxContext,
      className: props.className,
      popOverBoxRef: this.setPopOverBoxRef
    }
    delete this.popOverBoxContext.popOverRef
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
      this.props.isVisible === true
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
      this.props.isVisible && (
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
  setPopOverBoxRef = el => this.popOverBox = el

  setPositionState = () => {
    let {popOverDirection, theme, width, height} = this.props
    const direction = (
      popOverDirection
      || getPosFromProps(defaultTheme.defaultProps)
    )
    this.setState(
      setDirectionStyle(direction, this.container, this.popOverBox, {width, height})
    )
  }

  reposition = () => {
    this.imageLoader = loadImages(this.popOverBox)
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
      this.props.isVisible !== this.popOverContext.isVisible
      || this.state.renderPosition !== this.popOverContext.renderPosition
      || this.props.className !== this.popOverBoxContext.className
    ) {
      const {renderPosition, ...style} = this.state
      this.popOverContext = {
        ...this.popOverContext,
        renderPosition,
        isVisible: this.props.isVisible,
        popOverRef: this.setContainerRef
      }
      this.popOverBoxContext = {
        ...this.popOverContext,
        style,
        className: this.props.className,
        popOverBoxRef: this.setPopOverBoxRef
      }
      delete this.popOverBoxContext.popOverRef
    }

    return (
      <Provider value={this.popOverBoxContext}>
        {this.props.children(this.popOverContext)}
      </Provider>
    )
  }
}


function ViewportPopOver (props) {
  // props here can be safely mutated
  return ViewportConsumer({
    observe: props.repositionOnScroll ? void 0 : 'size',
    children: vpProps => {
      props.width = vpProps.width
      props.height = vpProps.height

      if (props.repositionOnScroll) {
        props.scrollY = vpProps.scrollY
      }

      return React.createElement(PopOverContainer, props)
    }
  })
}


export default function PopOver ({...props}, innerRef) {
  const popOverDirection = getPosFromProps(props) || 'fromBottom'
  return (props.transition || Drop)({
    [popOverDirection]: true,
    ...props,
    children: function (popOverProps) {
      popOverProps.children = props.children
      popOverProps.popOverDirection = popOverDirection
      return ViewportPopOver(popOverProps)
    }
  })
}