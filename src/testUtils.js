import React from 'react'
import {renderHook} from '@testing-library/react-hooks'
import {CurlsContext, createTheme} from './ThemeProvider'


export const renderHookWithTheme = (children, userTheme = {}) => {
  const theme = createTheme(userTheme)
  return renderHook(
    children,
    {
      wrapper: ({children}) => (
        <CurlsContext.Provider
          value={{theme, userTheme: theme}}
          children={children}
        />
      ),
    },
  )
}
