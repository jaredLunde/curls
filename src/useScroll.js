import {useEffect} from 'react'
import {useThrottle} from '@react-hook/throttle'
import emptyArr from 'empty/array'

export default (container, fps = 30) => {
  const [scrollY, setThrottledScroll] = useThrottle(
    !container ? 0 : container.scrollTop,
    fps,
    true
  )

  useEffect(() => {
    const handleScroll = () => setThrottledScroll(container.scrollTop)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, emptyArr)

  return scrollY
}
