import DefaultLayout from '@/layouts/DefaultLayout';
import { getCustomer } from '@/lib/data';
import AboutSidebar from '@/modules/account/components/about-sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My account',
};

export default async function RootLayout({
  dashboard,
  login,
  params: { countryCode },
}: {
  dashboard?: React.ReactNode;
  login?: React.ReactNode;
  params: { countryCode: string };
}) {
  const customer = await getCustomer().catch(() => null);

  return (
    <DefaultLayout countryCode={countryCode}>
      <main className="lg:flex lg:pr-20 xl:pr-39">
        {customer && <AboutSidebar countryCode={countryCode} />}
        <div className="w-full max-w-7xl px-4 py-10 lg:pb-16 lg:pl-20 lg:pr-0 lg:pt-23 xl:pl-39">
          {customer ? dashboard : login}
        </div>
      </main>
    </DefaultLayout>
  );
}
