import Link from 'next/link';
import { Heading } from '@/modules/common/ui/Heading';

export const Footer = ({ countryCode }: { countryCode: string }) => {
  return (
    <footer className="bg-gray-20 pb-6 text-primary">
      <div className="border-y border-primary pb-18 pt-17">
        <div className="items-center px-4 lg:px-24 xl:grid xl:grid-cols-12">
          <div className="col-span-5 mb-10 xl:mb-0">
            <Heading size="xl" className="mb-4.5 uppercase">
              Don&apos;t be shy, We know you want those discount coupons
            </Heading>

            <p className="text-sm">
              We will also send you our latest drops and news.
            </p>
          </div>

          <span className="col-span-3" />

          <div className="col-span-4 items-center md:flex md:gap-10 lg:items-stretch lg:gap-4"></div>
        </div>
      </div>

      <div className="border-y border-b-primary">
        <div className="flex items-stretch justify-between px-4 lg:px-24">
          <div className="max-w-16 sm:max-w-32 lg:max-w-none">
            <p className="py-6 text-xs font-black uppercase italic sm:text-sm md:text-md lg:py-8 lg:text-lg">
              Nothing is green here
            </p>
          </div>

          <span className="mx-4 border-r border-primary xl:mx-0" />

          <ul className="flex flex-col items-start gap-6 py-6 text-xs md:text-sm lg:flex-row lg:items-center lg:gap-10 lg:py-9">
            <li>
              <Link href={`/${countryCode}/faq`}>FAQ</Link>
            </li>
            <li>
              <Link href={`/${countryCode}/help`}>Help</Link>
            </li>
            <li>
              <Link href={`/${countryCode}/home`}>Delivery</Link>
            </li>
            <li>
              <Link href={`/${countryCode}/home`}>Returns</Link>
            </li>
          </ul>

          <span className="mx-4 border-r border-primary xl:mx-0" />

          <ul className="flex flex-col items-start justify-end gap-6 py-6 text-xs md:text-sm lg:flex-row lg:items-center lg:gap-10 lg:py-9">
            <li>
              <Link href={`/${countryCode}/home`}>Instagram</Link>
            </li>
            <li>
              <Link href={`/${countryCode}/home`}>TikTok</Link>
            </li>
            <li>
              <Link href={`/${countryCode}/home`}>Pinterest</Link>
            </li>
            <li>
              <Link href={`/${countryCode}/home`}>Facebook</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse justify-between text-xs lg:flex-row lg:px-24 lg:text-sm">
        <div>
          <p className="ml-4 mt-6 lg:ml-0 lg:mt-0">© 2023, Red</p>
        </div>

        <ul className="flex justify-between gap-6 border-b border-primary px-4 pb-6 text-xs md:text-sm lg:gap-10 lg:border-0 lg:px-0 lg:pb-0">
          <li>
            <Link href={`/${countryCode}/privacy-policy`}>Privacy Policy</Link>
          </li>
          <li>
            <Link href={`/${countryCode}/cookie-policy`}>Cookie Policy</Link>
          </li>
          <li>
            <Link href={`/${countryCode}/terms-of-use`}>Terms of Use</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
