import getHeight from './getHeight'


export default function ({height}, trimHeight) {
  if (!trimHeight) {
    return {height}
  }

  return {height: getHeight(height, trimHeight)}
}
