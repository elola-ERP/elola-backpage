import Head from "next/head";
import { SidebarProvider } from "../features/dashboard/SideBar/sidebarContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { wrapper } from '../store';
import { AppDispatch } from "../store/store";
import { useEffect } from "react";
import { login } from '../store/authSlice';

export default function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <title>elola | your business partner</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <SidebarProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SidebarProvider>
    </>
    
  )
}
