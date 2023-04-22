import React from "react";
import {PageContext} from "../../renderer/types";
import type {SwaggerSettings} from "@tsed/swagger"; // ! keep type import

export interface HomePageProps {
  docs: ({ url: string; } & SwaggerSettings) []
}

export function Page({docs}: PageContext & HomePageProps) {
  return (
    <>
      <h1>Welcome,</h1>

      <p>This page is built with Ts.ED and vite-plugin-ssr.</p>

      <br />
      <br />

      <ul>
        {
          docs.map((doc) => {
            return <li><a href={doc.path}><span>OpenSpec {doc.specVersion}</span></a></li>;
          })
        }
      </ul>
    </>
  );
}
