"use client";

import { store } from "@/app/store/store";
import { Provider } from "react-redux";

export function RTKProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
