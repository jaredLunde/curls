// Credit: Michael Jackson
// https://github.com/ReactTraining/react-media/blob/master/modules/Media.js
//
// License: MIT
import React from 'react'
import reduceProps from 'react-cake/es/utils/reduceProps'
import createOptimized from 'react-cake/es/utils/createOptimized'
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
      this.setQueriesList(this.props)
      this.updateMatches(this.props)
    }
  }

  getMatchesState (query) {
    let matches = this.mediaQueries.map(mql => mql.matches)

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
      function ({matches}) {
        matches[x] = this.mediaQueries[x].matches
        matches = [...matches]
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

      const mql = window.matchMedia(query)
      mql.addListener(this.updateSingleMatch(x))
      this.mediaQueries.push(mql)
    }
  }

  componentWillUnmount () {
    for (let x = 0; x < this.mediaQueries.length; x++) {
      this.mediaQueries[x].removeListener(this.updateSingleMatch(x))
    }
  }

  render () {
    let {children, ...props} = this.props
    props = reduceProps(props, propTypes)
    const {matches} = this.state

    if (Array.isArray(matches)) {
      props.matchesAny = this.state.matches.some(isTrue)
      props.matchesAll = this.state.matches.every(isTrue)
    }

    props.matches = matches
    return children(props)
  }
}
