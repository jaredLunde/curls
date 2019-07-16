require('browser-env')()
import test from 'ava'
import React from 'react'
import {css} from '@emotion/core'
import {renderHookWithTheme} from './testUtils'
import useStyles from './useStyles'


const renderUseStyles = (props, config, theme) => renderHookWithTheme(
  () => useStyles(props, config),
  theme
)

test('boolean prop', t => {
  const config = {
      name: 'box',
      styles: {
        block: css`display: block;`
      }
    }

  // true
  let result = renderUseStyles({block: true}, config).result.current
  t.is(result.css.length, 1)
  t.is(result.css[0].styles, 'display:block;')
  t.is(result.block, void 0)
  // false
  result = renderUseStyles({block: false}, config).result.current
  t.is(result.css, void 0)
  t.is(result.block, void 0)
  // undefined
  result = renderUseStyles({block: void 0}, config).result.current
  t.is(result.css, void 0)
  t.is(result.block, void 0)
  // null
  result = renderUseStyles({block: null}, config).result.current
  t.is(result.css, void 0)
  t.is(result.block, void 0)
})


test('boolean prop w/ multiple values', t => {
  const config = {
    name: 'box',
    styles: {
      block: [
        css`display: noop;`,
        css`display: block;`
      ]
    }
  }

  // true
  let result = renderUseStyles({block: true}, config).result.current
  t.is(result.css.length, 2)
  t.is(result.css[0].styles, 'display:noop;')
  t.is(result.css[1].styles, 'display:block;')
  t.is(result.block, void 0)
})


test('boolean prop w/ breakpoints', t => {
  let
    config = {
      name: 'box',
      styles: {
        block: css`display: block;`,
        hidden: css`display: none;`,
      }
    }

  // empty props
  let props = {block: '@desktop @tablet', hidden: '@phone'}
  let result = renderUseStyles(props, config).result.current

  t.is(result.css.length, 3)
  // phone first
  t.is(result.css[0].styles, '@media only screen and (min-width: 0em){display:none;;}')
  // tablet next
  t.is(result.css[1].styles, '@media only screen and (min-width: 35em){display:block;;}')
  // then desktop
  t.is(result.css[2].styles, '@media only screen and (min-width: 80em){display:block;;}')
})


test('enum prop', t => {
  const config = {
    name: 'box',
    styles: {
      display: {
        block: css`display: block;`,
        none: css`display: none;`,
        multi: [
          css`display: noop;`,
          css`display: none;`
        ]
      }
    }
  }

  // block
  let result = renderUseStyles({display: 'block'}, config).result.current
  t.is(result.css.length, 1)
  t.is(result.css[0].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))

  // none
  result = renderUseStyles({display: 'none'}, config).result.current
  t.is(result.css.length, 1)
  t.is(result.css[0].styles, 'display:none;')
  t.false(result.hasOwnProperty('display'))

  // multi
  result = renderUseStyles({display: 'multi'}, config).result.current
  t.is(result.css.length, 2)
  t.is(result.css[0].styles, 'display:noop;')
  t.is(result.css[1].styles, 'display:none;')
  t.false(result.hasOwnProperty('display'))

  // undefined enum value
  const fn = () => {
    throw renderUseStyles({display: 'throws'}, config).result.error
  }

  const error = t.throws(() => {fn()}, ReferenceError)
  t.is(error.message, `Error in enum prop 'display'. Value 'throws' not found in: block, none, multi.`)

  // false
  result = renderUseStyles({display: false}, config).result.current
  t.is(result.css, void 0)
  t.false(result.hasOwnProperty('display'))

  // null
  result = renderUseStyles({display: null}, config).result.current
  t.is(result.css, void 0)
  t.false(result.hasOwnProperty('display'))

  // undefined
  result = renderUseStyles({display: void 0}, config).result.current
  t.is(result.css, void 0)
  t.false(result.hasOwnProperty('display'))
})


test('enum prop w/ breakpoints', t => {
  let
    config = {
      name: 'box',
      styles: {
        display: {
          block: css`display: block;`,
          none: css`display: none;`,
        }
      }
    }

  // empty props
  let props = {display: 'block@tablet block@desktop none@phone'}
  let result = renderUseStyles(props, config).result.current

  t.is(result.css.length, 3)
  // phone first
  t.is(result.css[0].styles, '@media only screen and (min-width: 0em){display:none;;}')
  // tablet next
  t.is(result.css[1].styles, '@media only screen and (min-width: 35em){display:block;;}')
  // then desktop
  t.is(result.css[2].styles, '@media only screen and (min-width: 80em){display:block;;}')
})


test('functional prop', t => {
  const config = {
    name: 'box',
    styles: {
      display: value => !value ? null : css`display: ${value};`
    }
  }

  // display: block
  let result = renderUseStyles({display: 'block'}, config).result.current
  t.is(result.css.length, 1)
  t.is(result.css[0].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))

  // return null
  result = renderUseStyles({display: null}, config).result.current
  t.is(result.css, void 0)
  t.false(result.hasOwnProperty('display'))

  // undefined
  result = renderUseStyles({display: void 0}, config).result.current
  t.is(result.css, void 0)
  t.false(result.hasOwnProperty('display'))
})


test('functional prop w/ multiple return values', t => {
  const config = {
    name: 'box',
    styles: {
      display: value => !value ? null : [css`display: none;`, css`display: ${value};`]
    }
  }

  let result = renderUseStyles({display: 'block'}, config).result.current
  t.is(result.css.length, 2)
  t.is(result.css[0].styles, 'display:none;')
  t.is(result.css[1].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))
})


test('functional prop w/ theme', t => {
  let
    config = {
      name: 'box',
      styles: {
        display: (value, theme) => css`display: ${theme.displayOptions[value]};`
      }
    },
    theme = {
      box: {
        displayOptions: {
          block: 'block'
        }
      }
    }

  // display: block
  let result = renderUseStyles({display: 'block'}, config, theme).result.current
  t.is(result.css.length, 1)
  t.is(result.css[0].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))

  // display: undefined
  result = renderUseStyles({display: 'undefined'}, config, theme).result.current
  t.is(result.css.length, 1)
  t.is(result.css[0].styles, 'display:;')
  t.false(result.hasOwnProperty('display'))
})


test('functional prop w/ props', t => {
  let
    config = {
      name: 'box',
      styles: {
        display: (value, theme, props) => css`display: ${props.nonsenseDisplay};`
      }
    }

  // display: block
  let result = renderUseStyles({display: 'block', nonsenseDisplay: 'nonsense'}, config).result.current
  t.is(result.css.length, 1)
  t.is(result.css[0].styles, 'display:nonsense;')
  t.false(result.hasOwnProperty('display'))
})


test('functional prop w/ default theme', t => {
  let
    config = {
      name: 'box',
      styles: {
        display: (value, theme) => css`display: ${theme.displayOptions[value]};`
      },
      defaultTheme: {
        displayOptions: {
          none: 'none'
        }
      }
    },
    theme = {
      box: {
        displayOptions: {
          block: 'block'
        }
      }
    }

  // display: block
  let result = renderUseStyles({display: 'block'}, config, theme).result.current
  t.is(result.css.length, 1)
  t.is(result.css[0].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))

  // display: undefined
  result = renderUseStyles({display: 'none'}, config, theme).result.current
  t.is(result.css.length, 1)
  t.is(result.css[0].styles, 'display:none;')
  t.false(result.hasOwnProperty('display'))
})


test('functional prop w/ breakpoints', t => {
  let
    config = {
      name: 'box',
      styles: {
        display: value => css`display: ${value};`
      }
    }

  // empty props
  let props = {display: 'block@tablet none@phone block@desktop'}
  let result = renderUseStyles(props, config).result.current

  t.is(result.css.length, 3)
  // phone first
  t.is(result.css[0].styles, '@media only screen and (min-width: 0em){display:none;;}')
  // tablet next
  t.is(result.css[1].styles, '@media only screen and (min-width: 35em){display:block;;}')
  // then desktop
  t.is(result.css[2].styles, '@media only screen and (min-width: 80em){display:block;;}')
})


test('w/ default styles', t => {
  let
    config = {
      name: 'box',
      styles: {
        display: {
          block: css`display: block;`
        }
      },
      defaultStyles: [
        css`display: none;`
      ]
    }

  // array defaults
  let result = renderUseStyles({display: 'block'}, config).result.current
  t.is(result.css.length, 2)
  t.is(result.css[0].styles, 'display:none;')
  t.is(result.css[1].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))

  // singular default
  config.defaultStyles = css`display: none;`
  result = renderUseStyles({display: 'block'}, config).result.current
  t.is(result.css.length, 2)
  t.is(result.css[0].styles, 'display:none;')
  t.is(result.css[1].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))
})

test('kind prop', t => {
  let
    config = {
      name: 'box',
      styles: {
        display: {
          block: css`display: block;`
        }
      }
    },
    theme = {
      box: {
        kinds: {
          block: {
            display: 'block'
          },
          cssPropSingular: {
            css: css`display: none;`
          },
          cssPropArray: {
            display: 'block',
            css: [css`display: none;`, css`display: inline;`]
          },
          cssProp: {
            css: css`display: none;`,
            display: 'block',
          }
        }
      }
    }

  // block
  let result = renderUseStyles({kind: 'block'}, config, theme).result.current
  t.is(result.css.length, 1)
  t.is(result.css[0].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))
  t.false(result.hasOwnProperty('kind'))

  // singular
  result = renderUseStyles({kind: 'cssPropSingular'}, config, theme).result.current
  t.is(result.css.length, 1)
  t.is(result.css[0].styles, 'display:none;')
  t.false(result.hasOwnProperty('display'))
  t.false(result.hasOwnProperty('kind'))

  // array
  result = renderUseStyles({kind: 'cssPropArray'}, config, theme).result.current
  t.is(result.css.length, 3)
  t.is(result.css[0].styles, 'display:none;')
  t.is(result.css[1].styles, 'display:inline;')
  t.is(result.css[2].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))
  t.false(result.hasOwnProperty('kind'))
  // ensures we write a new array because we reallllly don't want kinds to be mutable
  t.not(result.css, theme.box.kinds.cssPropArray)

  // singular
  result = renderUseStyles({kind: 'cssProp'}, config, theme).result.current
  t.is(result.css.length, 2)
  t.is(result.css[0].styles, 'display:none;')
  t.is(result.css[1].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))
  t.false(result.hasOwnProperty('kind'))

  // undefined kind
  result = renderUseStyles({kind: 'undefined'}, config, theme).result.current
  t.is(result.css, void 0)
  t.true(result.hasOwnProperty('kind'))
})


test('default props', t => {
  let
    config = {
      name: 'box',
      styles: {
        display: {
          block: css`display: block;`
        }
      }
    },
    theme = {
      box: {
        defaultProps: {
          display: 'block'
        }
      }
    }

  // block
  let result = renderUseStyles({}, config, theme).result.current
  t.is(result.css.length, 1)
  t.is(result.css[0].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))
})


test('mutable css prop', t => {
  let
    config = {
      name: 'box',
      styles: {
        display: {
          block: css`display: block;`
        }
      }
    }

  // array prop
  let props = {css: [], display: 'block'}
  let result = renderUseStyles(props, config).result.current
  t.is(result.css.length, 1)
  t.is(result.css[0].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))
  t.is(result.css, props.css)

  // object prop
  props = {css: css`display: none;`, display: 'block'}
  result = renderUseStyles(props, config).result.current
  t.is(result.css.length, 2)
  t.is(result.css[0].styles, 'display:none;')
  t.is(result.css[1].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))
  t.not(result.css, props.css)
})


test('immutable props', t => {
  let
    config = {
      name: 'box',
      styles: {
        display: {
          block: css`display: block;`
        }
      }
    }

  // empty props
  let props = {}
  let result = renderUseStyles(props, config).result.current
  t.not(props, result)

  // some props
  props = {display: 'block'}
  result = renderUseStyles(props, config).result.current
  t.not(props, result)
})


test('throws w/o name', t => {
  const config = {
    styles: {
      block: css`display: block;`
    }
  }

  const
    fn = () => { throw renderUseStyles({block: true}, config).result.error },
    error = t.throws(() => {fn()}, Error)

  t.is(
    error.message,
    `useStyles() must be used with a 'name' option set in order to access the proper theme`
  )
})


test('some breakpoint props, some normal props', t => {
  let
    config = {
      name: 'box',
      styles: {
        padding: value => css`padding: ${value};`
      }
    }

  // empty props
  let props = {padding: '[10px 10px]@tablet 16px 18px [20px 20px]'}
  let result = renderUseStyles(props, config).result.current

  t.is(result.css.length, 4)
  t.is(result.css[0].styles, 'padding:16px;')
  t.is(result.css[1].styles, 'padding:18px;')
  t.is(result.css[2].styles, 'padding:20px 20px;')
  // tablet
  t.is(result.css[3].styles, '@media only screen and (min-width: 35em){padding:10px 10px;;}')
})


test('grouped breakpoint props', t => {
  let
    config = {
      name: 'box',
      styles: {
        padding: value => css`padding: ${value};`
      }
    }

  // empty props
  let props = {padding: '[10px 10px]@tablet [16px 12px 16px]@phone [20px 21px 22px 23px]@desktop'}
  let result = renderUseStyles(props, config).result.current

  t.is(result.css.length, 3)
  // phone first
  t.is(result.css[0].styles, '@media only screen and (min-width: 0em){padding:16px 12px 16px;;}')
  // tablet next
  t.is(result.css[1].styles, '@media only screen and (min-width: 35em){padding:10px 10px;;}')
  // then desktop
  t.is(result.css[2].styles, '@media only screen and (min-width: 80em){padding:20px 21px 22px 23px;;}')
})


test('grouped breakpoint props w/ functions', t => {
  let
    config = {
      name: 'box',
      styles: {
        padding: value => css`padding: ${value};`
      }
    }

  // empty props
  let props = {padding: '[10px 10px]@tablet [calc(10vh + 36px) 21px 22px 23px]@desktop'}
  let result = renderUseStyles(props, config).result.current

  t.is(result.css.length, 2)
  // tablet
  t.is(result.css[0].styles, '@media only screen and (min-width: 35em){padding:10px 10px;;}')
  // desktop
  t.is(result.css[1].styles, '@media only screen and (min-width: 80em){padding:calc(10vh + 36px) 21px 22px 23px;;}')
})


test('grouped breakpoint props w/ funky multiline spacing', t => {
  let
    config = {
      name: 'box',
      styles: {
        padding: value => css`padding: ${value};`
      }
    }

  // empty props
  let
    props = {
    padding: `
      
        [10px 10px]@tablet    
           [calc(10vh + 36px) 21px 22px 23px]@desktop
      `
    },
    result = renderUseStyles(props, config).result.current

  t.is(result.css.length, 2)
  // tablet
  t.is(result.css[0].styles, '@media only screen and (min-width: 35em){padding:10px 10px;;}')
  // desktop
  t.is(result.css[1].styles, '@media only screen and (min-width: 80em){padding:calc(10vh + 36px) 21px 22px 23px;;}')
})
