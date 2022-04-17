import React, { ReactNode } from "react";
import { Helmet } from "react-helmet";

type LayoutProps = {
  children: ReactNode
};

export function Layout({ children }: LayoutProps) {
  return <main className="container mx-auto px-4 max-w-screen-md">
    <Helmet>
      { /* Increase the font size as the screen gets larger. */ }
      <html className="text-[18px] lg:text-[20px] xl:text-[22px]" />
    </Helmet>
    { children }
  </main>;
}
