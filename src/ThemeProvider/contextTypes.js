import {func, object, shape} from 'prop-types'


export default {
  curls: shape({
    getTheme: func.isRequired,
    setTheme: func.isRequired,
    replaceTheme: func.isRequired,
    subscribe: func.isRequired,
    unsubscribe: func.isRequired,
  })
}
