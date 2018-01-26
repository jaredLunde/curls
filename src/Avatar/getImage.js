import React from 'react'


export default function ({src, defaultSrc, innerRef, alt, ...props}) {
  return <img
    key={src || defaultSrc}
    src={src || defaultSrc}
    alt={alt}
    onError={e => e.target.src = defaultSrc || ''}
    ref={innerRef}
  />
}
