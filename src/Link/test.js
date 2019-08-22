import React from 'react'
import {css} from '@emotion/core'
import {createMemoryHistory} from 'history'
import {Router, Link as RLink, NavLink as RNavLink} from 'react-router-dom'
import {renderFragment} from 'test-utils'
import {A} from './A'
import {Link} from './Link'
import {NavLink} from './NavLink'

test('<A> -> as prop', () => {
  expect(renderFragment(<A as="span" />)).toMatchSnapshot()
})

test('<A> -> box props', () => {
  expect(renderFragment(<A m="b3" />)).toMatchSnapshot()
})

test('<A> -> flex props', () => {
  expect(renderFragment(<A row />)).toMatchSnapshot()
})

test('<A> -> hover/active class', () => {
  const theme = {
    link: {
      getHoverClass: () =>
        css`
          &:hover {
            background-color: red;
          }
        `,
      getActiveClass: () =>
        css`
          &:active {
            background-color: blue;
          }
        `,
    },
  }

  expect(renderFragment(<A />, theme)).toMatchSnapshot()
})

test('<Link> -> component', () => {
  const theme = {
    link: {
      component: RLink,
    },
  }

  expect(
    renderFragment(
      <Router history={createMemoryHistory()}>
        <Link to="/home" />
      </Router>,
      theme
    )
  ).toMatchSnapshot('/home')
})

test('<NavLink> -> component', () => {
  const theme = {
    navLink: {
      component: RNavLink,
    },
  }

  expect(
    renderFragment(
      <Router history={createMemoryHistory()}>
        <NavLink to="/home" />
      </Router>,
      theme
    )
  ).toMatchSnapshot('/home')
})
