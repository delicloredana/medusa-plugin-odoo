'use client';

import { MEDUSA_BACKEND_URL, queryClient } from '@/lib/config';
import { NotificationProvider } from '@/lib/context/notification-context';
import { MedusaProvider } from 'medusa-react';
import localFont from 'next/font/local';
import 'styles/globals.css';
const monaSans = localFont({
  src: [
    {
      path: '../public/fonts/mona-sans/Mona-Sans-Regular.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/mona-sans/Mona-Sans-RegularItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/mona-sans/Mona-Sans-SemiBold.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/mona-sans/Mona-Sans-SemiBoldItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/mona-sans/Mona-Sans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/mona-sans/Mona-Sans-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/mona-sans/Mona-Sans-Black.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/mona-sans/Mona-Sans-BlackItalic.otf',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--font-mona-sans',
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl={MEDUSA_BACKEND_URL}
    >
      <NotificationProvider>
        <div className={`${monaSans.className}`}>{children}</div>
      </NotificationProvider>
    </MedusaProvider>
  );
};

export default Providers;
