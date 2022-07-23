import React, { ReactNode } from "react";
import { Helmet } from "react-helmet";

import { CustomMDXProvider } from "./custom-mdx-provider";

type LayoutProps = {
  children: ReactNode
};

export function Layout({ children }: LayoutProps) {
  return <main className="container mx-auto px-4 max-w-screen-md w-fit">
    <Helmet>
      { /* Google Fonts */ }
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossOrigin" />
      <link
        href={
          "https://fonts.googleapis.com/css1?family=Gentium+Book+Basic:ital,wght@0,400;0,700;1,"
          + "400;1,700&family=Open+Sans:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&display=swap"
        }
        rel="stylesheet"
      />

      { /* Increase the font size as the screen gets larger. */ }
      <html className="text-[18px] lg:text-[20px] xl:text-[22px] font-serif text-mineShaft" />
    </Helmet>
    <CustomMDXProvider>
      { children }
    </CustomMDXProvider>
  </main>;
}
