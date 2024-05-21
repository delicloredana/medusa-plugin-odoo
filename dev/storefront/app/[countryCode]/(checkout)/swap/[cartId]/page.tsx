import * as React from 'react';
import Link from 'next/link';
import { Heading } from '@/modules/common/ui/Heading';
import { Notification } from '@/modules/common/components/Notification';
import { Cart } from '@medusajs/medusa';
import { cookies } from 'next/headers';
import {
  createPaymentSessions,
  getCart,
  getCustomer,
  getRegion,
  listRegions,
} from '@/lib/data';
import { getCheckoutStep } from '@/lib/util/getCheckoutStep';
import { CheckoutCartInfo } from '@/modules/checkout/components/cart-info';
import { CheckoutCustomerInfo } from '@/modules/checkout/components/customer-info';
export type CartWithCheckoutStep = Omit<
  Cart,
  'beforeInsert' | 'beforeUpdate' | 'afterUpdateOrLoad'
> & {
  checkout_step: 'email' | 'address' | 'delivery' | 'payment';
};

const CheckoutPage = async ({
  params: { countryCode, cartId },
}: {
  params: { countryCode: string; cartId: string };
}) => {
  const customer = await getCustomer();
  if (!cartId) {
    return null;
  }
  const regions = await listRegions();
  const countries = regions?.flatMap((region: any) => region.countries);
  let cart = (await createPaymentSessions(cartId).then(
    (cart) => cart
  )) as CartWithCheckoutStep;
  // let cart = (await getCart(cartId)) as CartWithCheckoutStep;
  if (!cart) {
    return null;
  }
  const region = await getRegion(countryCode);
  cart.checkout_step = cart && getCheckoutStep(cart);
  if (cart) {
    return (
      <>
        <div className="flex h-full flex-col-reverse lg:flex-row">
          <CheckoutCustomerInfo
            cart={cart}
            currencyCode={region?.currency_code!}
            countryCode={countryCode}
            customer={customer}
            countries={countries}
          />

          <ul className="top-0 bg-gray-50 lg:sticky lg:h-screen lg:w-1/2 xl:w-[45%]">
            <li className="flex items-center justify-between bg-white px-4 pb-5 pt-4 lg:hidden">
              <Link href={`/${countryCode}/home`} className="inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="95"
                  height="36"
                  viewBox="0 0 95 36"
                  className="w-15.5 lg:w-auto"
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

              <div>
                <Heading size="md" className="text-primary">
                  Checkout
                </Heading>
              </div>
            </li>

            <CheckoutCartInfo cart={cart} />
          </ul>
        </div>
        <Notification close={'close'} />
      </>
    );
  }
};

export default CheckoutPage;
