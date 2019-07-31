import React from 'react'


export default ({src, defaultSrc, ref, alt}) => {
  return <img
    src={src || defaultSrc}
    alt={alt}
    onError={e => e.target.src = defaultSrc || ''}
    ref={ref}
  />
}
