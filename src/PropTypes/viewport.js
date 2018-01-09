import {func, number, string} from 'prop-types'


export default {
  inView: func,
  inViewX: func,
  inViewY: func,
  inFullView: func,
  inFullViewX: func,
  inFullViewY: func,
  getViewportSize: func,
  getViewportScroll: func,
  getAspect: func,
  subscribe: func,
  unsubscribe: func,
  viewportWidth: number,
  viewportHeight: number,
  orientation: string,
  screenOrientation: string,
  scrollTo: func,
}
