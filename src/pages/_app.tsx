import { TransactionContextProvider } from "../context";
import { SidebarProvider } from "../features/dashboard/SideBar/sidebarContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <TransactionContextProvider>
        <Component {...pageProps} />
      </TransactionContextProvider>
    </SidebarProvider>
  )
}
