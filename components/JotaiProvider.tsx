"use client"

import { createStore, Provider } from "jotai";

const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  const store = createStore();

  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default JotaiProvider;