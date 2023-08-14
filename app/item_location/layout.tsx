import React from "react";
import Header from "../components/common/pages/header";

export default function ItemLocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header title="棚移動" />
      {children}
    </section>
  );
}
