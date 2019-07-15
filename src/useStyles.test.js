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

  // singular
  result = renderUseStyles({kind: 'cssPropSingular'}, config, theme).result.current
  t.is(result.css.length, 1)
  t.is(result.css[0].styles, 'display:none;')
  t.false(result.hasOwnProperty('display'))

  // array
  result = renderUseStyles({kind: 'cssPropArray'}, config, theme).result.current
  t.is(result.css.length, 3)
  t.is(result.css[0].styles, 'display:none;')
  t.is(result.css[1].styles, 'display:inline;')
  t.is(result.css[2].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))
  // ensures we write a new array because we reallllly don't want kinds to be mutable
  t.not(result.css, theme.box.kinds.cssPropArray)

  // singular
  result = renderUseStyles({kind: 'cssProp'}, config, theme).result.current
  t.is(result.css.length, 2)
  t.is(result.css[0].styles, 'display:none;')
  t.is(result.css[1].styles, 'display:block;')
  t.false(result.hasOwnProperty('display'))
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

test('appends css', t => {
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

test('immutability', t => {
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
