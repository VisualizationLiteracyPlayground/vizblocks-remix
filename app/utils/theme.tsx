import * as React from 'react'
import { createTheme } from '@mui/material/styles'
import { CssBaseline, PaletteMode, Theme, useMediaQuery } from '@mui/material'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

enum ColorMode {
  LIGHT = 'light',
  DARK = 'dark',
}

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    // common palette values
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#6cddaa',
    },
    green: {
      main: '#6cddaa',
    },
    ...(mode === ColorMode.LIGHT
      ? {
          // palette values for light mode
          // background: {
          //   default: deepOrange[900],
          //   paper: deepOrange[900],
          // },
          // divider: amber[200],
          // text: {
          //   primary: grey[900],
          //   secondary: grey[800],
          // },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#6cddaa',
          },
          secondary: {
            main: '#435a6f',
          },
        }),
  },
})

const lightTheme = createTheme(getDesignTokens(ColorMode.LIGHT))

const ThemeContext = React.createContext<{
  toggleColorMode: () => void
  mode: ColorMode
  theme: Theme
}>({
  toggleColorMode: () => {},
  mode: ColorMode.LIGHT,
  theme: lightTheme,
})

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<ColorMode>(ColorMode.LIGHT)
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT))
      },
      mode,
      theme,
    }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={colorMode}>
      <EmotionThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { useTheme, ThemeProvider, getDesignTokens, ColorMode, lightTheme }
