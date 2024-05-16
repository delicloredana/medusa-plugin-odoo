import * as React from 'react';
import { Notification } from '@/modules/common/components/Notification';
import { Header } from '@/modules/nav/header';
import { Footer } from '@/modules/nav/footer';

export default function DefaultLayout({
  children,
  countryCode,
}: {
  children: React.ReactNode;
  countryCode: string;
}) {
  return (
    <>
      <Header countryCode={countryCode} />

      {children}
      <Footer countryCode={countryCode} />
      <Notification className=" top-15 mt-0 w-full  max-w-[15rem] p-4 " />
    </>
  );
}
