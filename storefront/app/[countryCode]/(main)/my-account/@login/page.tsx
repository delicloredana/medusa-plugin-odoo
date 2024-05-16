
import * as React from 'react';
import Link from 'next/link';
import { Heading } from '@/modules/common/ui/Heading';
import { Notification } from '@/modules/common/components/Notification';
import CustomerLogin from '@/modules/account/components/login';


const MyAccountLoginPage =  () => {
  return (
    <div className="w-full max-w-sm">
      <Heading className="mb-8 !leading-[1.1] text-primary lg:mb-16" size="xl3">
        Hey gorgeous,
        <br /> welcome back
      </Heading>

      <CustomerLogin />

      <p className="text-gray-400">
        Not red yet? Bro just{' '}
        <Link
          href="/my-account/register"
          className="relative ml-1 cursor-pointer text-primary before:absolute before:-bottom-1 before:h-[0.0625rem] before:w-full before:bg-primary hover:text-primary-900 hover:before:bg-primary-900"
        >
          sign up
        </Link>
      </p>
      <Notification className="max-w-md" />
    </div>
  );
};

export default MyAccountLoginPage;
