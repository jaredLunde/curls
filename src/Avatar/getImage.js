import React from 'react'


export default function ({src, defaultSrc, innerRef}) {
  return <img
    key={src || defaultSrc}
    src={src || defaultSrc}
    onError={e => e.target.src = defaultSrc || ''}
    ref={innerRef}
  />
}
