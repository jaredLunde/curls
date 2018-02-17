import React from 'react'
import {css, cx} from 'emotion'
import ViewportConsumer from '@render-props/viewport/es/ViewportConsumer'
import loadImages from '@render-props/image-props/es/utils/loadImages'
import {FlexBox} from '../Box'
import {pos, z} from '../Box/CSS'
import {flex} from '../Flex/CSS'
import Drop from '../Drop'
import {getPosFromProps} from '../Slide/utils'
import * as defaultTheme from './defaultTheme'
import {setDirectionStyle} from './utils'
import createComponent, {renderNode} from '../createComponent'


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


class PopOverContainer extends React.Component {
  imageLoader = null
  container = null
  state = {}

  componentDidMount () {
    if (this.props.isVisible === true) {
      this.reposition()
    }
  }

  componentDidUpdate ({width, height, isVisible}) {
    if ((
        this.props.isVisible === true
        && this.props.isVisible !== isVisible
      ) || (
        this.props.isVisible === true
        && width !== this.props.width
        && height !== this.props.height
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

  PopOverBox = props => {
    return SFC({
      ...props,
      children: boxProps => {
        const {renderPosition, ...state} = this.state

        boxProps.children = nodeProps => {
          nodeProps.children = props.children({
            isVisible: this.props.isVisible,
            reposition: this.reposition,
            show: this.props.show,
            hide: this.props.hide,
            toggle: this.props.toggle,
            renderPosition
          })

          nodeProps.innerRef = this.setPopOverBoxRef
          nodeProps.style = {...state, ...nodeProps.style}
          nodeProps.nodeType = nodeProps.nodeType || nodeType
          nodeProps.className = cx(this.props.className, nodeProps.className)

          return renderNode(nodeProps, defaultCSS)
        }

        return FlexBox(boxProps)
      }
    })
  }

  render () {
    return this.props.children({
      PopOverBox: this.PopOverBox,
      isVisible: this.props.isVisible,
      show: this.props.show,
      hide: this.props.hide,
      toggle: this.props.toggle,
      renderPosition: this.state.renderPosition,
      reposition: this.reposition,
      popOverRef: this.setContainerRef
    })
  }
}


function ViewportPopOver (props) {
  return (
    <ViewportConsumer>
      {function (vpProps) {
        return <PopOverContainer
          width={vpProps.width}
          height={vpProps.height}
          {...props}
        />
      }}
    </ViewportConsumer>
  )
}


export default function PopOver ({children, transition = Drop, ...props}) {
  const popOverDirection = getPosFromProps(props)

  return transition({
    ...props,
    children: function (popOverProps) {
      return ViewportPopOver({children, popOverDirection, ...popOverProps})
    }
  })
}
