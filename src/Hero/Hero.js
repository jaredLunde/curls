import React from 'react'
import {css} from '@emotion/core'
import FillViewport from '../FillViewport'
import {FlexBox} from '../Box'
import {flex, column, align, justify} from '../Flex/styles'
import {w, pos, ov} from '../Box/styles'
import createComponent, {renderNode} from '../createComponent'
import {getStyle} from './utils'


class HeroBS extends React.Component {
  state = {mounted: false}

  componentDidMount () {
    this.setState({mounted: true})
  }

  render () {
    const {style, vpProps, nodeProps} = this.props
    nodeProps.as = nodeProps.as || as
    const heroStyle = getStyle(style, nodeProps.trimHeight)
    nodeProps.style = {
      ...heroStyle,
      ...vpProps.style
    }
    nodeProps.children = this.props.children
    nodeProps.key = this.state.mounted
    delete nodeProps.trimHeight
    return renderNode(nodeProps, defaultCSS)
  }
}

const as = 'div'
const defaultCSS = css`
  ${flex};
  ${column.column};
  ${align.center};
  ${justify.center};
  ${pos.relative};
  ${ov.touch};
  width: 100%;
`

const SFC = createComponent({name: 'Hero'})
const Hero = React.forwardRef(
  function Hero (props, innerRef) {
    return SFC({
      innerRef,
      ...props,
      children: function (vpProps) {
        return FillViewport({
          children: function ({style}) {
            vpProps.children = function (nodeProps) {
              // must be here like this for hydration
              return <HeroBS
                style={style}
                vpProps={vpProps}
                nodeProps={nodeProps}
                children={props.children}
              />
            }

            return FlexBox(vpProps)
          }
        })
      }
    })
  }
)

export default Hero