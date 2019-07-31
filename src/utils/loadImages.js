import CancelablePromise from 'cancelable-promise'


export const loadImage = img => new CancelablePromise((resolve, reject) => {
  if (img.complete === true || img.naturalHeight > 0)
    resolve({target: img})
  else {
    img.onload = resolve
    img.onerror = reject
  }
})

export default el => {
  if (!el) return new CancelablePromise(resolve => resolve())

  const images = el.getElementsByTagName('img')
  if (images === null || images.length === 0)
    return new CancelablePromise(resolve => resolve([]))

  let imgs = [], i = 0
  for (; i < images.length; i++) imgs.push(loadImage(images[i]))
  return CancelablePromise.all(imgs)
}