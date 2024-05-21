'use client';
import { Input } from '@/modules/common/ui/Input';
import { Button } from '@/modules/common/ui/Button';
import React from 'react';
import { logCustomerIn } from '../../actions';
import { useFormState } from 'react-dom';
export interface LoginInfo {
  email: string;
  password: string;
}
const CustomerLogin = () => {
  const [message, formAction] = useFormState(logCustomerIn, null);

  return (
    <form className="mb-4 xl:mb-16" id="formElement" action={formAction}>
      <Input
        type="email"
        name="email"
        label="Email"
        wrapperClassName="mb-4 lg:mb-8"
      />

      <Input
        name="password"
        type="password"
        label="Password"
        wrapperClassName="mb-4 lg:mb-8"
      />
      <Button size="lg" className="w-full" type="submit">
        Log in
      </Button>
    </form>
  );
};

export default CustomerLogin;
