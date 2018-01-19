import {func, object, shape} from 'prop-types'


export default {
  curls: shape({
    theme: object.isRequired,
    setTheme: func.isRequired,
    replaceTheme: func.isRequired,
    subscribe: func.isRequired,
    unsubscribe: func.isRequired,
  })
}
