import React from "react";
import Header from "../components/common/pages/header";

export default function CoordePickLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header title="コーデピック" />
      {children}
    </section>
  );
}
