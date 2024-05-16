'use client';
import { Heading } from '@/modules/common/ui/Heading';
import Link from 'next/link';
import { signOut } from '../../actions';
import { Button } from '@/modules/common/ui/Button';

const AboutSidebar = ({ countryCode }: { countryCode: string }) => {
  const activeItemClasses = 'font-black text-primary italic';
  return (
    <div className="block w-full whitespace-nowrap bg-gray-50 lg:sticky lg:top-0 lg:h-screen lg:w-auto lg:px-10 lg:pb-16 lg:pt-23 xl:px-23">
      <Heading className="mb-8 hidden text-primary lg:block xl:mb-12" size="xl">
        My account
      </Heading>
      <ul className="flex justify-between gap-x-8 gap-y-6 overflow-auto px-4 py-6 lg:flex-col lg:px-0">
        <li>
          <Link href={`/${countryCode}/my-account/`}>Personal & security</Link>
        </li>
        <li>
          <Link href={`/${countryCode}/my-account/payment-method/`}>
            Payment method
          </Link>
        </li>
        <li>
          <Link href={`/${countryCode}/my-account/orders`}>My orders</Link>
        </li>
        <li className="bottom-37 cursor-pointer lg:absolute">
          <Button onPress={async () => await signOut()}>Log out</Button>
        </li>
      </ul>
    </div>
  );
};

export default AboutSidebar;
