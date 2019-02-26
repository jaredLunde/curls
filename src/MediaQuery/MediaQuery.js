// Credit: Michael Jackson
// https://github.com/ReactTraining/react-media/blob/master/modules/Media.js
//
// License: MIT
import React from 'react'
import json2mq from 'json2mq'
import propTypes from './propTypes'


function queriesDidChange (prevQueries, nextQueries) {
  if (Array.isArray(prevQueries) && Array.isArray(nextQueries)) {
    if (prevQueries.length === nextQueries.length) {
      for (let i = 0; i < nextQueries.length; i++) {
        if (nextQueries[i] !== prevQueries[i]) {
          return true
        }
      }

      return false
    } else {
      return true
    }
  } else {
    return prevQueries !== nextQueries
  }
}

class MediaQuery extends React.Component {
  constructor (props) {
    super(props)
    this.setQueriesList(props)

    if (props.defaultMatches === void 0 || typeof window !== 'undefined') {
      this.state = this.updateMatches()
      // this.state = {matches: []}
    }
    else {
      this.state = {matches: props.defaultMatches}
    }
  }

  componentDidMount () {
    // having this here helps some hydration issues
    this.setState(this.updateMatches)
  }

  componentDidUpdate ({query}) {
    if (queriesDidChange(query, this.props.query)) {
      this.removeMediaQueries()
      this.setQueriesList(this.props)
      this.setState(this.updateMatches)
    }
  }

  componentWillUnmount () {
    this.removeMediaQueries()
  }

  updateMatches = prevState => {
    let matches = this.mediaQueries.map(mql => mql[0].matches)

    if (prevState === void 0 || prevState.matches.length !== matches.length) {
      return {matches}
    }
    else {
      for (let i = 0; i < prevState.matches.length; i++) {
        if (prevState.matches[i] !== matches[i]) {
          return {matches}
        }
      }

      return null
    }
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

    if (typeof window === 'undefined') {
      return
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
    const {matches} = this.state
    return this.props.children({
      matches,
      matchesAny: matches.some(Boolean),
      matchesAll: matches.every(Boolean)
    })
  }
}

MediaQuery.propTypes /* remove-proptypes */ = propTypes
export default MediaQuery