import React from 'react'


export default function ({src, defaultSrc, innerRef, alt}) {
  return <img
    src={src || defaultSrc}
    alt={alt}
    onError={e => e.target.src = defaultSrc || ''}
    ref={innerRef}
  />
}
