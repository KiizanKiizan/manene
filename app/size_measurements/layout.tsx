import React from 'react';
import Header from '../_components/common/pages/header';

export default function SizeMeasurementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header title="アイテムサイズ計測" />
      {children}
    </section>
  );
}
