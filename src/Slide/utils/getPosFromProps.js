const positions = ['fromTop', 'fromLeft', 'fromRight', 'fromBottom']


export default function (props) {
  const propKeys = Object.keys(props)
  for (let x = propKeys.length - 1; x > -1; x--) {
    const key = propKeys[x]
    if (positions.indexOf(key) > -1 && !!props[key]) {
      return key
    }
  }
}
