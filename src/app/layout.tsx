import { appConfig } from "@/config/app";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Layout } from "nextra-theme-docs";
import { Search } from "nextra/components";

import "nextra-theme-docs/style.css";
import { getPageMap } from "nextra/page-map";
import * as React from "react";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: appConfig.name,
    template: `%s | ${ appConfig.name }`,
  },
  description: appConfig.description,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
} satisfies Viewport;

const RootLayout = async (props: LayoutProps<"/">) => {
  const pageMap = await getPageMap();

  return (
    <html lang="en" className="dark" style={ { colorScheme: "dark" } }>
    <body
      className={ `${ spaceGrotesk.variable } ${ inter.variable } font-display antialiased selection:bg-primary/30 selection:text-primary bg-background text-foreground min-h-screen` }
    >
      <React.Suspense>
        <Layout
          navbar={ props.header }
          pageMap={ pageMap }
          docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          footer={ props.footer }
          editLink="Edit this page on GitHub"
          sidebar={ { defaultMenuCollapseLevel: 1 } }
          darkMode={ false }
          nextThemes={ { defaultTheme: "dark" } }
          search={ <Search placeholder="Search plugins & docs..."/> }
          // ... Your additional layout options
        >
          { props.children }
        </Layout>
      </React.Suspense>
    </body>
    </html>
  );
};
export default RootLayout;
