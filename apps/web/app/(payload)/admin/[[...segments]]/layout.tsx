import { RootLayout } from "@payloadcms/next/layouts";
import config from "@payload-config";
import React from "react";
import { importMap } from "../../importMap";
import "@payloadcms/next/css";
import { serverFunction } from "./serverFunction";

export { metadata } from "@payloadcms/next/layouts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
