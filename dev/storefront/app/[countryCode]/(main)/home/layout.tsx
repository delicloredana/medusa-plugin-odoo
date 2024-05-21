import { Footer } from '@/modules/nav/footer';
import { Notification } from '@/modules/common/components/Notification';
import { Header } from '@/modules/nav/header';
import 'styles/globals.css';
export default function RootLayout({
  children,
  params:{countryCode}
}: {
  children: React.ReactNode;
  params: {countryCode: string}
}) {
  return (
    <>
      <Header colorScheme="inverted" isAbsolute countryCode={countryCode} />
      {children}
      <Footer countryCode={countryCode} />
      <Notification className="top-15 mt-0 w-full  max-w-[15rem] p-4 " />
    </>
  );
}
