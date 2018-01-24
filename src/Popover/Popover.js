import React from 'react'
import {css, cx} from 'emotion'
import WithViewport from 'react-cake/es/Viewport/WithViewport'
// import createOptimized from 'react-cake/es/utils/createOptimized'
import compose from 'react-cake/es/utils/compose'
import reduceProps from 'react-cake/es/utils/reduceProps'
import loadImages from 'react-cake/es/utils/loadImages'
import {FlexBox} from '../Box'
import {pos, z} from '../Box/CSS'
import {flex} from '../Flex/CSS'
import Drop from '../Drop'
import {getPosFromProps} from '../Slide/utils'
import * as defaultTheme from './defaultTheme'
import {setDirectionStyle} from './utils'
import createComponent, {renderNode} from '../createComponent'
import viewport from '../PropTypes/viewport'


/**
PopOver({
  delay: 200,
  fromLeft: true,
  children: function ({PopOverBox, popOverRef, renderPosition, show, hide, ...props}) {
    return (
      <div>
        {PopOverBox({
          p: 4,
          onMouseEnter: show,
          onMouseLeave: hide,
          children: function ({isVisible, show, hide, toggle}) {
            return <Type bold color='black'>Hello</Type>
          }
        })}

        <Button innerRef={popOverRef} onMouseEnter={show} onMouseLeave={hide}>
          Hover me
        </Button>
      </div>
    )
  }
})
*/
const defaultCSS = css`
  ${flex};
  ${pos.fixed};
  ${z(1)};
`
const nodeType = 'div'
const SFC = createComponent({name: 'Popover', defaultTheme, themePath: 'popOver'})


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
      || getPosFromProps(defaultTheme.defaultProps)
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
      show,
      hide,
      toggle,
      isVisible,
      ...props
    } = this.props
    props = reduceProps(props, viewport)
    const poClassName = className

    const PopOverBox = props => {
      return SFC({
        ...props,
        children: boxProps => {
          const {renderPosition, ...state} = this.state
          boxProps.children = nodeProps => {
            nodeProps.children = props.children({
              isVisible,
              reposition: this.reposition,
              show,
              hide,
              toggle,
              renderPosition
            })
            nodeProps.innerRef = this.setPopOverBoxRef
            nodeProps.style = {...state, ...nodeProps.style}
            nodeProps.nodeType = nodeProps.nodeType || nodeType
            nodeProps.className = cx(className, nodeProps.className)
            return renderNode(nodeProps, defaultCSS)
          }

          return FlexBox(boxProps)
        }
      })
    }

    return children({
      PopOverBox,
      isVisible,
      show,
      hide,
      toggle,
      renderPosition: this.state.renderPosition,
      ...props,
      popOverRef: this.setContainerRef
    })
  }
}


const ComposedPopOver = compose([WithViewport, PopOverContainer])


export default function PopOver ({children, transition = Drop, ...props}) {
  const popOverDirection = getPosFromProps(props)

  return transition({
    ...props,
    children: function (popOverProps) {
      return ComposedPopOver({children, popOverDirection, ...popOverProps})
    }
  })
}
