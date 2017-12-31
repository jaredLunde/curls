import {rgba, lighten, darken} from 'polished'

export const blue = '#30A9DE'
export const darkBlue = darken(0.5, blue)
export const lightBlue = lighten(0.15, blue)

export const green = '#2dc483'
export const darkGreen = darken(0.5, green)
export const lightGreen = lighten(0.30, green)

export const red = '#E53A40'
export const darkRed = darken(0.10, red)
export const lightRed = lighten(0.10, red)

export const yellow = '#ffc952'
export const darkYellow = darken(0.10, yellow)
export const lightYellow = lighten(0.10, yellow)

export const orange = '#e87d34'
export const darkOrange = darken(0.10, orange)
export const lightOrange = lighten(0.25, darkOrange)

export const lightestGrey = '#f4f4f5'
export const lighterGrey = '#dbdbda'
export const lightGrey = darken(0.25, lighterGrey)
export const grey = '#6f6567'
export const darkGrey = darken(0.10, grey)
export const darkerGrey = darken(0.15, grey)
export const darkestGrey = darken(0.20, grey)
export const black = darken(0.5, darkestGrey)
export const white = '#fefeff'
export const translucentDark = rgba(0, 0, 0, 0.6)
export const translucent = rgba(0, 0, 0, 0.4)
export const translucentLight = rgba(0, 0, 0, 0.2)
export const translucentWhite = rgba(255, 255, 255, 0.6)
