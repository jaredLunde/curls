import CancelablePromise from 'cancelable-promise'

export default img =>
  new CancelablePromise((resolve, reject) => {
    if (img.complete === true || img.naturalHeight > 0) resolve({target: img})
    else {
      img.onload = resolve
      img.onerror = reject
    }
  })
