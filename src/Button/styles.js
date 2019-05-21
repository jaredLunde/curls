import {fastMemoize, memoTheme} from '../utils'


const
  getPlainScale = memoTheme((s, t) => t.scale[s]),
  themeScale = fastMemoize(
    'buttonSize',
    s => (t, p) => typeof t.scale[s] === 'function' ? t.scale[s](t, p) : getPlainScale(s, t)
  )

export const
  size = (s, t, p) => themeScale(s)(t, p),
  __buttonStyles = (v, t, p) => [t.getHoverClass(t, p), t.getActiveClass(t, p)]