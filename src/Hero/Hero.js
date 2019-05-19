import React, {useState, useEffect} from 'react'
import {css} from '@emotion/core'
import {useWindowHeight} from '@react-hook/window-size'
import emptyArr from 'empty/array'
import {useBox} from '../Box'
import {flex, column, align, justify} from '../Flex/styles'
import {pos, ov} from '../Box/styles'
import {renderNode} from '../createComponent'
import {getStyle} from './utils'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'
import useStyles from '../useStyles'


const defaultCSS = css([
  flex,
  column.column,
  align.center,
  justify.center,
  pos.relative,
  ov.touch,
  'width: 100%;'
])

const
  options = {name: 'hero', styles: {trimHeight: () => null}},
  Hero = React.forwardRef(
    (props, ref) => {
      const
        [mounted, setMounted] = useState('false'),
        height = useWindowHeight(0)
      useEffect(() => setMounted('true'), emptyArr)
      const nodeProps = useBox(useStyles(props, options))
      nodeProps.style = Object.assign({}, getStyle(height, props.trimHeight), props.style)
      nodeProps.ref = ref
      nodeProps.key = mounted
      return renderNode(nodeProps, defaultCSS)
    }
  )

if (__DEV__) {
  Hero.displayName = 'Hero'
  Hero.propTypes = Object.assign({}, boxPropTypes, flexPropTypes)
}

export default Hero