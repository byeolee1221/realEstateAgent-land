"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // 페이지 로딩하면 theme을 서버가 모르는데 themeProvider 렌더링되면 theme이 존재하여 서버와 클라이언트의 구조가 달라 Extra attributes from the server 오류가 발생하는 것을 해결하기 위한 방법
  const [isMount, setIsMount] = React.useState(false);

  React.useEffect(() => {
    setIsMount(true);
  }, [])

  if (!isMount) {
    return null;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
