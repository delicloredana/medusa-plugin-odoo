'use client';
import classNames from '@/utils/classNames';
import React from 'react';
import { useCartShippingOptions } from 'medusa-react';
import { getCurrency } from '@/utils/prices';
import Link from 'next/link';
import { Cart, Country, Customer } from '@medusajs/medusa';
import {
  addShippingMethod,
  getCart,
  setPaymentSession,
  updateCart,
} from '@/lib/data';
import { placeOrder, setPaymentMethod } from '@/modules/checkout/actions';
import { CheckoutBilling } from '@/modules/checkout/components/forms/billing-address';
import { CheckoutEmail } from '@/modules/checkout/components/forms/email';
import { Button } from '@/modules/common/ui/Button';
import { DeliveryAddressForm } from '../forms/delivery-address';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const CheckoutCustomerInfo = ({
  cart,
  countryCode,
  customer,
  countries,
  currencyCode,
}: {
  cart: Omit<Cart, 'refunded_total' | 'refundable_amount'> | null | undefined;
  countryCode: string;
  customer: Omit<Customer, 'password_hash'> | null | undefined;
  countries: Country[] | undefined;
  currencyCode: string;
}) => {
  const searchParams = useSearchParams();
  const [showBillingForm, setShowBillingForm] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<string>();
  const [paymentOption, setPaymentOption] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  const handleCompleteCheckout = React.useCallback(async () => {
    setLoading(true);
    await placeOrder(cart?.id);
    setLoading(false);
  }, [cart]);
  const router = useRouter();
  const params = useParams();
  React.useEffect(() => {
    const fetch = async () => {
      if (
        customer?.shipping_addresses &&
        !cart?.shipping_address?.address_1 &&
        !cart?.billing_address?.address_1 &&
        customer?.billing_address
      ) {
        const customerAddresses = customer.shipping_addresses.filter(
          (shipping_address) => shipping_address.country_code === countryCode
        );
        const customerAddress =
          customerAddresses.find(
            (address) => address.id === customer.metadata?.primary_address
          ) || customerAddresses[0];

        if (customerAddress) {
          await updateCart(cart?.id || '', {
            shipping_address: {
              first_name: customer.first_name,
              last_name: customer.last_name,
              address_1: customerAddress.address_1 || '',
              city: customerAddress.city || '',
              country_code: customerAddress.country_code || '',
              postal_code: customerAddress.postal_code || '',
              phone: customerAddress.phone || '',
              metadata: {},
              company: '',
              address_2: '',
              province: '',
            },
          });
          await updateCart(cart?.id || '', {
            billing_address: {
              first_name:
                customer.billing_address?.first_name || customer.first_name,
              last_name:
                customer.billing_address?.last_name || customer.last_name,
              address_1: customer.billing_address.address_1 || '',
              city: customer.billing_address.city || '',
              country_code: customer.billing_address.country_code || '',
              postal_code: customer.billing_address.postal_code || '',
              phone: customer.billing_address.phone || '',
            },
          });
        } else {
          await updateCart(cart?.id || '', {
            billing_address: {
              first_name:
                customer.billing_address?.first_name || customer.first_name,
              last_name:
                customer.billing_address?.last_name || customer.last_name,
              address_1: customer.billing_address.address_1 || '',
              city: customer.billing_address.city || '',
              country_code: customer.billing_address.country_code || '',
              postal_code: customer.billing_address.postal_code || '',
              phone: customer.billing_address.phone || '',
            },
          });
        }
      } else if (
        customer?.shipping_addresses &&
        !cart?.shipping_address?.address_1
      ) {
        const customerAddress = customer.shipping_addresses.filter(
          (shipping_address) => shipping_address.country_code === countryCode
        )?.[0];

        if (customerAddress) {
          updateCart(cart?.id || '', {
            shipping_address: {
              first_name: customer.first_name,
              last_name: customer.last_name,
              address_1: customerAddress.address_1 || '',
              city: customerAddress.city || '',
              country_code: customerAddress.country_code || '',
              postal_code: customerAddress.postal_code || '',
              phone: customerAddress.phone || '',
              metadata: {},
              company: '',
              address_2: '',
              province: '',
            },
          });
        }
      } else if (
        !cart?.billing_address?.address_1 &&
        customer?.billing_address
      ) {
        updateCart(cart?.id || '', {
          billing_address: {
            first_name:
              customer.billing_address?.first_name || customer.first_name,
            last_name:
              customer.billing_address?.last_name || customer.last_name,
            address_1: customer.billing_address.address_1 || '',
            city: customer.billing_address.city || '',
            country_code: customer.billing_address.country_code || '',
            postal_code: customer.billing_address.postal_code || '',
            phone: customer.billing_address.phone || '',
          },
        });
      }
      if (!cart?.billing_address && !customer?.billing_address) {
        setShowBillingForm(true);
      }
      setPaymentOption(cart?.payment_session?.provider_id);
    };
    fetch();
  }, [customer?.id, cart?.id]);
  const { shipping_options, isLoading } = useCartShippingOptions(cart?.id!);
  const stepOneNext = async (email: string) => {
    if (!customer) {
      await updateCart(cart?.id || '', { email });
    }
    router.push(
      cart?.type === 'swap'
        ? `/${params?.countryCode}/swap/${cart?.id}?step=address`
        : `/${params?.countryCode}/checkout?step=address`
    );
  };

  if (cart) {
    return (
      <div className="px-4 pb-10 pt-6 lg:w-1/2 lg:px-12 xl:w-[55%] xl:px-24">
        <Link
          href={`/${countryCode}/home`}
          className="mb-14 hidden lg:inline-block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="95"
            height="36"
            fill="none"
          >
            <g fill="#1E2DA0" clipPath="url(#a)">
              <path d="M58.596 36h-26.75L38.104.11h26.75L62.75 12.073H50.067l-.221 1.053h12.738l-1.661 9.415H48.24l-.222 1.108h12.683l-2.105 12.35ZM66.184.11h14.677c10.357 0 14.843 5.04 13.126 14.899l-1.218 6.923c-.554 3.157-1.385 5.705-2.603 7.865C87.84 33.95 83.74 36 76.264 36H59.926L66.184.11Zm12.351 11.52L76.43 24.036h.056c1.052 0 1.384-.276 1.717-2.27l1.384-8.031c.333-1.772.222-2.105-.941-2.105h-.111ZM35.502 7.089c-.388-2.437-1.717-4.32-4.265-5.539C30.13.997 28.745.61 27.084.387A31.326 31.326 0 0 0 22.93.11H6.536L.277 36h14.4l1.883-10.69c.887 0 1.219.111 1.053 1.607-.056.221-.056.498-.111.83l-1.052 5.871L16.062 36h14.4l.332-1.828 1.163-6.535.111-.499c.83-4.763.222-6.812-3.6-7.643 2.437-.554 4.32-1.662 5.594-3.877.61-1.108 1.108-2.492 1.385-4.154.221-1.606.276-3.101.055-4.375Zm-14.954 6.203c-.166.83-.443 1.385-.83 1.661a1.323 1.323 0 0 1-.776.277h-.665l.665-3.766h.61c.332 0 .553.111.72.277.332.277.442.886.276 1.55Z" />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h94.708v36H0z" />
              </clipPath>
            </defs>
          </svg>
        </Link>
        <ul className="[&>li:first-child]:pt-0 [&>li:last-child]:border-0 [&>li:last-child]:pb-0 [&>li]:border-b [&>li]:py-8">
          <CheckoutEmail
            customer={customer}
            cart={cart}
            stepOneNext={stepOneNext}
          />

          <li>
            <ul className="flex items-start justify-between">
              <li
                className={classNames({
                  'mb-7 font-black italic text-primary':
                    searchParams.get('step') === 'address',
                })}
              >
                2. Delivery details
              </li>
              {searchParams.get('step') !== 'address' && (
                <li>
                  <button
                    disabled={!cart?.email || false}
                    className="relative transition-all before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-gray-900 before:content-[''] hover:font-black hover:before:border-b-2"
                    onClick={() =>
                      router.push(
                        cart.type === 'swap'
                          ? `/${params?.countryCode}/swap/${cart?.id}?step=address`
                          : `/${params?.countryCode}/checkout?step=address`
                      )
                    }
                  >
                    Change
                  </button>
                </li>
              )}
            </ul>

            {searchParams.get('step') === 'address' ? (
              <DeliveryAddressForm countries={countries} cart={cart} />
            ) : (
              cart?.shipping_address && (
                <ul className="mt-8 [&>ul:last-child]:mb-0 [&>ul]:mb-8">
                  <ul className="flex [&>li:first-child]:break-words">
                    <li className="w-1/3 pr-6 text-gray-400 md:w-1/5">Name</li>

                    <li className="w-2/3 text-gray-600 md:w-4/5">
                      {cart?.shipping_address?.first_name}{' '}
                      {cart?.shipping_address?.last_name}
                    </li>

                    <li className="w-2/3 text-gray-600 md:w-4/5"></li>
                  </ul>

                  <ul className="flex [&>li:first-child]:break-words">
                    <li className="w-1/3 pr-6 text-gray-400 md:w-1/5">
                      Ship to
                    </li>

                    <li className="w-2/3 text-gray-600 md:w-4/5">
                      {cart?.shipping_address?.address_1}
                    </li>
                  </ul>

                  <ul className="flex [&>li:first-child]:break-words">
                    <li className="w-1/3 pr-6 text-gray-400 md:w-1/5">Phone</li>

                    <li className="w-2/3 text-gray-600 md:w-4/5">
                      {cart?.shipping_address?.phone}
                    </li>
                  </ul>
                </ul>
              )
            )}
          </li>

          <li>
            <ul className="flex items-start justify-between">
              <li
                className={classNames({
                  'mb-7 font-black italic text-primary':
                    searchParams.get('step') === 'delivery',
                })}
              >
                3. Shipping method
              </li>
              {searchParams.get('step') !== 'delivery' && (
                <li>
                  <button
                    className="relative transition-all before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-gray-900 before:content-[''] hover:font-black hover:before:border-b-2"
                    onClick={() =>
                      router.push(
                        cart.type === 'swap'
                          ? `/${params?.countryCode}/swap/${cart?.id}?step=delivery`
                          : `/${params?.countryCode}/checkout?step=delivery`
                      )
                    }
                    disabled={
                      !cart.shipping_address?.address_1 ||
                      !cart.shipping_address.country_code ||
                      false
                    }
                  >
                    Change
                  </button>
                </li>
              )}
            </ul>

            {searchParams.get('step') === 'delivery' ? (
              <form>
                <ul className="[&>li:last-child]:mb-0 [&>li]:mb-2">
                  {shipping_options?.map((option) => (
                    <li className="relative" key={option.id}>
                      <input
                        type="radio"
                        name="shippingMethod"
                        id={option.id}
                        className="peer hidden"
                        value={option.id}
                        onChange={() => setSelectedOption(option.id)}
                      />
                      <label
                        htmlFor={option.id}
                        className="group flex cursor-pointer justify-between rounded-sm border px-4 py-3 leading-none transition-all peer-hover:border-primary lg:py-5"
                      >
                        <div className="flex items-center">
                          {selectedOption === option.id ? (
                            <span className="relative block h-4 w-4 rounded-full border border-gray-900 bg-gray-900 transition-all before:absolute before:left-[0.3125rem] before:top-[0.3125rem] before:h-1 before:w-1 before:rounded-full before:bg-gray-10 before:content-[''] group-hover:border-primary group-hover:bg-primary" />
                          ) : (
                            <span className="relative block h-4 w-4 rounded-full border border-gray-900 transition-all group-hover:border-primary" />
                          )}

                          <p className="ml-3">{option.name}</p>
                        </div>
                        <p>
                          {getCurrency(currencyCode)}
                          {option.amount ? (option.amount / 100).toFixed(2) : 0}
                        </p>
                      </label>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className="mt-10"
                  isLoading={isLoading}
                  isDisabled={!selectedOption}
                  onPress={async () => {
                    if (selectedOption) {
                      await addShippingMethod({
                        cartId: cart?.id || '',
                        shippingMethodId: selectedOption,
                      });
                      router.push(
                        cart.type === 'swap'
                          ? `/${params?.countryCode}/swap/${cart?.id}?step=payment`
                          : `/${params?.countryCode}/checkout?step=payment`
                      );
                    }
                  }}
                >
                  Next
                </Button>
              </form>
            ) : (
              <ul className="mt-8 flex">
                <li className="w-1/3 break-words pr-6 text-gray-400 md:w-1/5">
                  Shipping
                </li>

                {cart?.shipping_methods?.map((method) => (
                  <li key={method.id} className="w-2/3 text-gray-600 md:w-4/5">
                    {method.shipping_option.name}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <p
              className={classNames({
                'mb-6 font-black italic text-primary':
                  searchParams.get('step') === 'payment',
              })}
            >
              4. Payment
            </p>

            {searchParams.get('step') === 'payment' && (
              <div>
                <CheckoutBilling
                  showBillingForm={showBillingForm}
                  setShowBillingForm={setShowBillingForm}
                  countries={countries}
                  cart={cart}
                  customer={customer}
                />
                <ul className="[&>li:last-child]:mb-0 [&>li]:mb-2">
                  <li>
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="cash"
                      className="peer hidden"
                      value="cash"
                      disabled={showBillingForm}
                    />
                    <label
                      htmlFor="cash"
                      className={
                        paymentOption === 'manual'
                          ? 'border-black-700 group flex cursor-pointer justify-between rounded-sm border px-4 py-4 transition-all hover:!border-red-900'
                          : 'group flex cursor-pointer justify-between rounded-sm border px-4 py-4 transition-all peer-hover:border-primary'
                      }
                    >
                      <div className="flex items-center">
                        {paymentOption === 'manual' ? (
                          <span className="relative block h-4 w-4 rounded-full border border-gray-900 bg-gray-900 transition-all before:absolute before:left-[0.3125rem] before:top-[0.3125rem] before:h-1 before:w-1 before:rounded-full before:bg-gray-10 before:content-[''] group-hover:border-primary group-hover:bg-primary" />
                        ) : (
                          <span className="relative block h-4 w-4 rounded-full border border-gray-900 transition-all group-hover:border-primary" />
                        )}
                        <p className="ml-3">Cash</p>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
        { (
          <Button
            size="lg"
            className="mt-10 w-full"
            isDisabled={searchParams.get('step') !== 'payment'}
            onPress={handleCompleteCheckout}
            isLoading={loading}
          >
            Complete {cart.type === 'swap' ? 'swap' : 'order'}
          </Button>
        )}
      </div>
    );
  }
};
