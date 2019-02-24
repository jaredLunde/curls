import getHeight from './getHeight'


export default ({height}, trimHeight) => {
  if (!trimHeight) {
    return {height: height === 0 ? '100vh' : height}
  }

  return {height: getHeight(height, trimHeight)}
}
