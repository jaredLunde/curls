// Credit: Michael Jackson
// https://github.com/ReactTraining/react-media/blob/master/modules/Media.js
//
// License: MIT
import React from 'react'
import reduceProps from 'react-cake/es/utils/reduceProps'
// import createOptimized from 'react-cake/es/utils/createOptimized'
import json2mq from 'json2mq'
import propTypes from './propTypes'


function isTrue (el) { return el === true }
function queriesDidChange (prevQueries, nextQueries) {
  if (Array.isArray(prevQueries) && Array.isArray(nextQueries)) {
    if (prevQueries.length === nextQueries.length) {
      for (let x = 0; x < nextQueries.length; x++) {
        if (nextQueries[x] !== prevQueries[x]) {
          return true
        }

        return false
      }
    } else {
      return true
    }
  } else {
    return prevQueries !== nextQueries
  }
}


export default class MediaQuery extends React.Component {
  static propTypes = propTypes

  constructor (props) {
    super(props)
    this.setQueriesList(props)
    this.state = this.getMatchesState(props.query)
  }

  componentDidUpdate ({query}) {
    if (queriesDidChange(query, this.props.query)) {
      this.removeMediaQueries()
      this.setQueriesList(this.props)
      this.updateMatches(this.props)
    }
  }

  componentWillUnmount () {
    this.removeMediaQueries()
  }

  getMatchesState (query) {
    let matches = this.mediaQueries.map(mql => mql[0].matches)

    if (Array.isArray(query) === false) {
      matches = matches[0]
    }

    return {matches}
  }

  updateMatches ({query}) {
    this.setState(this.getMatchesState(query))
  }

  updateSingleMatch = x => () => {
    this.setState(
      prevState => {
        const doesMatch = this.mediaQueries[x][0].matches
        if (doesMatch === prevState.matches[x]) {
          return null
        }

        const matches = [...prevState.matches]
        matches[x] = doesMatch
        return {matches}
      }
    )
  }

  setQueriesList ({query}) {
    this.mediaQueries = []

    if (Array.isArray(query) === false) {
      query = [query]
    }

    for (let x = 0; x < query.length; x++) {
      const mq = typeof query[x] === 'string' ? query[x] : json2mq(query[x])

      const mql = window.matchMedia(mq)
      const cb = this.updateSingleMatch(x)
      mql.addListener(cb)
      this.mediaQueries.push([mql, cb])
    }
  }

  removeMediaQueries () {
    for (let x = 0; x < this.mediaQueries.length; x++) {
      const [mq, cb] = this.mediaQueries[x]
      mq.removeListener(cb)
    }
  }

  render () {
    const props = {
      matches: this.state.matches
    }

    if (Array.isArray(props.matches)) {
      props.matchesAny = props.matches.some(isTrue)
      props.matchesAll = props.matches.every(isTrue)
    }

    return this.props.children(props)
  }
}
