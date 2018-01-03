import getHeight from './getHeight'


export default function (style, trimHeight) {
  if (!trimHeight) {
    return style
  }

  return {...style, height: getHeight(style.height, trimHeight)}
}
