import {useRef, useEffect, useReducer} from 'react'
import json2mq from 'json2mq'

const queriesDidChange = (prevQueries, nextQueries) => {
  if (
    Array.isArray(prevQueries) === true &&
    Array.isArray(nextQueries) === true
  ) {
    if (prevQueries.length === nextQueries.length) {
      for (let i = 0; i < nextQueries.length; i++)
        if (nextQueries[i] !== prevQueries[i]) return true
    } else return true
  } else return prevQueries !== nextQueries

  return false
}

const init = ({queries, defaultMatches}) => {
  queries = Array.isArray(queries) === true ? queries : [queries]
  let mediaQueries = [],
    matches = [],
    i = 0

  if (typeof window === 'undefined')
    return {mediaQueries: queries, matches: defaultMatches}

  for (; i < queries.length; i++) {
    const mq =
        typeof queries[i] === 'string' ? queries[i] : json2mq(queries[i]),
      mql = window.matchMedia(mq)
    matches.push(mql.matches)
    mediaQueries.push(mql)
  }

  return {mediaQueries, matches}
}

const reducer = (state, action) => {
  let matches = [],
    i = 0

  switch (action.type) {
    case 'updateMatch':
      for (; i < state.mediaQueries.length; i++)
        matches.push(state.mediaQueries[i].matches)

      return {matches, mediaQueries: state.mediaQueries}

    case 'setQueries':
      return init(action)
  }

  if (__DEV__) throw `Unrecognized action: ${action.type}`
}

export default (queries, defaultMatches) => {
  const prevQueries = useRef(queries),
    [state, dispatch] = useReducer(reducer, {queries, defaultMatches}, init)

  useEffect(() => {
    if (queriesDidChange(queries, prevQueries.current)) {
      dispatch({type: 'setQueries', queries, defaultMatches})
      prevQueries.current = queries
    }
  }, [queries])

  useEffect(() => {
    const callbacks = []
    for (let i = 0; i < state.mediaQueries.length; i++) {
      const mq = state.mediaQueries[i]
      callbacks.push(() => dispatch({type: 'updateMatch', mq}))
      mq.addListener(callbacks[i])
    }

    return () => {
      for (let i = 0; i < state.mediaQueries.length; i++)
        state.mediaQueries[i].removeListener(callbacks[i])
    }
  }, [state.mediaQueries])

  const {matches} = state
  return {
    matches,
    matchesAny: matches.some(Boolean),
    matchesAll: matches.length > 0 && matches.every(Boolean),
  }
}
