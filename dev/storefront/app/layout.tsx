import 'styles/globals.css';
import Providers from './providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medusa shop',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <head>
      <link rel="preload" href="/icons.svg" as="image" type="image/svg+xml" />
    </head>
    <body>
       <Providers>{children}</Providers>
    </body>
  </html>
  
  );
}
