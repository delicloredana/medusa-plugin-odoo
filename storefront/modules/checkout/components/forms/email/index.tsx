'use client';
import classNames from '@/utils/classNames';
import React from 'react';
import { Cart, Customer } from '@medusajs/medusa';
import { Input } from '@/modules/common/ui/Input';
import { Button } from '@/modules/common/ui/Button';
import { updateCart } from '@/lib/data';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
interface CheckoutEmailProps {
  stepOneNext: (email: string) => void;
  cart: Omit<Cart, 'refunded_total' | 'refundable_amount'> | undefined | null;
  customer: Omit<Customer, 'password_hash'> | undefined | null;
}
export const CheckoutEmail: React.FC<CheckoutEmailProps> = ({
  cart,
  customer,
}) => {
  const [email, setEmail] = React.useState<string>('');
  const params = useParams();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get('step') === 'email';
  const router = useRouter();
  return (
    <li>
      <ul className="flex items-start justify-between">
        <li
          className={classNames({
            'mb-7 font-black italic text-primary': isOpen,
          })}
        >
          1. Email
        </li>
        {!isOpen && (
          <li>
            <button
              className="relative transition-all before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-gray-900 before:content-[''] hover:font-black hover:before:border-b-2"
              onClick={() =>
                router.push(
                  cart?.type === 'swap'
                    ? `/${params?.countryCode}/swap/${cart?.id}?step=email`
                    : `/${params?.countryCode}/checkout?step=email`
                )
              }
            >
              Change
            </button>
          </li>
        )}
      </ul>

      {isOpen ? (
        <form>
          <Input
            type="email"
            label="Email"
            name="email"
            defaultValue={customer?.email ? customer.email : cart?.email || ''}
            errorMessage={
              !customer?.email && email === ''
                ? 'Please enter your email'
                : undefined
            }
            wrapperClassName="[&>span]:static"
            disabled={customer ? true : false}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="mt-3.5 flex items-start gap-1">
            <input
              type="checkbox"
              name="email"
              id="email"
              className="relative h-4 w-4 shrink-0 cursor-pointer appearance-none border border-gray-400 transition-all checked:border-gray-900 checked:bg-gray-900 checked:before:absolute checked:before:left-[0.1875rem] checked:before:top-[0.1875rem] checked:before:h-[0.3125rem] checked:before:w-2 checked:before:-rotate-45 checked:before:border-b-2 checked:before:border-l-2 checked:before:border-gray-10 checked:before:content-[''] hover:border-primary hover:checked:bg-primary focus-visible:outline-0"
            />
            <label
              htmlFor="email"
              className="cursor-pointer text-xs2 text-gray-400 lg:text-xs"
            >
              Want to get news and offers? Ok, yes and some discounts. But only
              if you subscribe.
            </label>
          </div>

          <Button
            type="button"
            size="lg"
            className="mt-10.5"
            isDisabled={(!email && !customer?.email) || false}
            onPress={async (e) => {
              await updateCart(cart?.id || '', { email });
              router.push(
                cart?.type === 'swap'
                  ? `/${params?.countryCode}/swap/${cart?.id}?step=address`
                  : `/${params?.countryCode}/checkout?step=address`
              );
            }}
          >
            Next
          </Button>
        </form>
      ) : (
        <ul className="mt-8 flex">
          <li className="w-1/3 break-words pr-6 text-gray-400 md:w-1/5">
            Email
          </li>

          <li className="w-2/3 break-words text-gray-600 md:w-4/5">
            {cart?.email}
          </li>
        </ul>
      )}
    </li>
  );
};
