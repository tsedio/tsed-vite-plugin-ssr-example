import React from "react";
import {PageContextProvider} from "./usePageContext";
import type {PageContext} from "./types";
import "./PageShell.css";
import LogoSvg from "./logo.svg"

export {PageShell};

function PageShell({children, pageContext}: { children: React.ReactNode; pageContext: PageContext }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Layout>
          <Logo/>
          <Content>{children}</Content>
        </Layout>
      </PageContextProvider>
    </React.StrictMode>
  );
}

function Layout({children}: { children: React.ReactNode }) {
  return (
    <div className="container">
      <div>
        {children}
      </div>
    </div>
  );
}

function Content({children}: { children: React.ReactNode }) {
  return (
    <main>
      {children}
    </main>
  );
}

function Logo() {
  return (
    <div
      className="container-logo"
    >
      <a href="https://tsed.io" className="logo-tsed">
        <img src="https://tsed.io/tsed-og.png" alt="Ts.ED"/>
      </a>
      <span>+</span>
      <a href="https://vite-plugin-ssr.com">
        <img src={LogoSvg} alt="vite-plugin-ssr" />
      </a>
    </div>
  );
}
