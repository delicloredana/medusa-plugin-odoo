import * as React from 'react';
import Link from 'next/link';
import { Heading } from '@/modules/common/ui/Heading';
import { getCustomer } from '@/lib/data';
import RegisterForm from '@/modules/account/components/register';

const MyAccountRegisterPage = async () => {
  const customer = await getCustomer();

  return (
    <div className="w-full max-w-sm">
      <Heading className="mb-8 !leading-[1.1] text-primary lg:mb-14" size="xl3">
        Hey gorgeous,
        <br /> welcome to red
      </Heading>
      <RegisterForm customer={customer} />
      <p className="text-gray-400">
        Already red? No worrier, just{' '}
        <Link
          href="/my-account/login"
          className="relative ml-1 cursor-pointer text-primary before:absolute before:-bottom-1 before:h-[0.0625rem] before:w-full before:bg-primary hover:text-primary-900 hover:before:bg-primary-900"
        >
          log in
        </Link>
      </p>
    </div>
  );
};

export default MyAccountRegisterPage;
