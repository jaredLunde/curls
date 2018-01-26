export const type = 'Component'
// export description from './description'
// export defaultTheme from '../defaultTheme'
export function resetDocTypes (types) {
  types = {...types}

  for (let type in types) {
    types[type] = {...types[type]}
    delete types[type].defaultValue
  }

  return types
}
