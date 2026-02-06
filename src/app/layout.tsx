import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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
  title: "Workflow Marketplace Home",
  description:
    "The next-generation marketplace for AI agents. Discover, fork, and deploy workflows directly into your stack.",
};

const RootLayout = (props: LayoutProps<"/">) => (
  <html lang="en" className="dark">
  <body
    className={ `${ spaceGrotesk.variable } ${ inter.variable } font-display antialiased selection:bg-primary/30 selection:text-primary bg-background text-foreground min-h-screen` }
  >
    { props.header }
    { props.children }
    { props.footer }
  </body>
  </html>
);
export default RootLayout;
