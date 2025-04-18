export type Theme = 'dark' | 'light' | 'system'
export type ResolvedTheme = 'dark' | 'light'

export interface ThemeStoreState {
  currentTheme: Theme
  resolvedTheme: ResolvedTheme
  systemTheme: ResolvedTheme

  changeTheme: (theme: Theme) => void
  updateSystemTheme: (newTheme: ResolvedTheme) => void
}
