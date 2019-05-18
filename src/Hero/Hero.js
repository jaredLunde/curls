import React from 'react'
import {css} from '@emotion/core'
import FillViewport from '../FillViewport'
import {FlexBox} from '../Box'
import {flex, column, align, justify} from '../Flex/styles'
import {w, pos, ov} from '../Box/styles'
import createComponent, {renderNode} from '../createComponent'
import {withChildren} from '../utils'
import {getStyle} from './utils'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'


class HeroBS extends React.Component {
  state = {mounted: 'false'}

  componentDidMount () {
    this.setState({mounted: 'true'})
  }

  render () {
    const {style, vpProps, nodeProps} = this.props
    nodeProps.as = nodeProps.as || as
    const heroStyle = getStyle(style, nodeProps.trimHeight)
    nodeProps.style = Object.assign({}, heroStyle, vpProps.style)
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
  (props, innerRef) => SFC(
    withChildren(
      props,
      vpProps => React.createElement(FillViewport, {
        children: ({style}) => {
          vpProps.children = nodeProps => {
            nodeProps.innerRef = innerRef
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
    )
  )
)

Hero.propTypes /* remove-proptypes */ = Object.assign({}, boxPropTypes, flexPropTypes)
export default Hero