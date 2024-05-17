import * as React from 'react';
import { Button } from '@/modules/common/ui/Button';
import { Heading } from '@/modules/common/ui/Heading';
import { retrieveOrder } from '@/lib/data';
import Link from 'next/link';

const OrderConfirmationPage = async ({
  params: { orderId, countryCode },
}: {
  params: { orderId: string; countryCode: string };
}) => {
  const result = await retrieveOrder(orderId);
  const order = result?.[0];

  if (!order) {
    return <p>Loading</p>;
  }
  if (order) {
    return (
      <main className="grid-cols-12 px-4 py-10 md:px-24 lg:grid lg:px-0 lg:pb-50 lg:pt-19">
        <span className="col-span-3" />

        <div className="col-span-6">
          <Heading className="mb-14 text-primary" size="xl4">
            Thank you for your order!
          </Heading>

          <div className="mb-16 text-md">
            <p className="mb-6">
              Thank you for your purchase! We are pleased to confirm that your
              order has been successfully placed and will be processed shortly.
            </p>

            <p>
              We have sent you the receipt and order details via{' '}
              <span className="font-bold">e-mail.</span>
            </p>
          </div>

          <div className="mb-16 flex flex-col justify-between gap-20 sm:flex-row">
            <div>
              <p className="mb-2">Your order number is:</p>
              <p className="font-bold">{order.display_id}</p>

              <ul className="mt-8 text-gray-600 sm:mt-16">
                <li className="mb-2">Shipping adress:</li>
                <li>
                  {order.shipping_address?.first_name}{' '}
                  {order.shipping_address?.last_name}
                </li>
                <li>
                  {order.shipping_address?.address_1},{' '}
                  {order.shipping_address?.postal_code}{' '}
                  {order.shipping_address?.city},{' '}
                  {order.shipping_address?.country_code?.toUpperCase()}
                </li>
                <li>{order.shipping_address?.phone}</li>
              </ul>
            </div>
          </div>
          <Link href={`/${countryCode}/home`}>
            <Button size="lg" className="w-full">
              Go back to home page
            </Button>
          </Link>
        </div>
      </main>
    );
  }
};

export default OrderConfirmationPage;
