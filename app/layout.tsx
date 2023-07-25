import React from "react";
import Providers from "./providers";
import AppBarContextProvider from "./components/common/context-provider/app-bar-context-provider";
import Header from "./components/header";

export const metadata = {
  title: "Manene",
  description: "Kiizan Kiizan's management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AppBarContextProvider>
          <Header />
          <Providers>{children}</Providers>
        </AppBarContextProvider>
      </body>
    </html>
  );
}
