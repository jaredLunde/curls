const now = typeof window !== 'undefined' ? performance.now.bind(performance) : require('performance-now')

const bench = (fn, time = 1000, opt = {}) => {
  const {before, after} = opt
  let elapsed = 0.0, iterations = 0

  while (elapsed < time) {
    if (before) {
      before()
    }

    const start = now()
    fn()
    elapsed += now() - start

    if (after) {
      after()
    }

    iterations++
  }

  console.log('------------------------------------')
  console.log('%cFunction', 'font-weight: 700', fn)
  console.log(
    '%cIterations/s:', 'font-weight: 700; color: green',
    1000.0 / (elapsed / iterations)
  )
}

export default bench