import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/modules/common/ui/Button';
import { Tag } from '@/modules/common/ui/Tag';
import { Icon } from '@/modules/common/ui/Icon';
import { Heading } from '@/modules/common/ui/Heading';
import { getCurrency } from '@/utils/prices';
import { cookies } from 'next/headers';
import { createCart, getCart, listRegions, retrieveOrder } from '@/lib/data';
import { formatDate } from '../page';
import redTShirtt from '../../../../../../../public/images/content/red-t-shirt.jpg';
import visa from '../../../../../../../public/images/content/visa.png';
import SingleSwap from '@/modules/orders/components/swap';

const MyAccountOrderSinglePage = async ({
  params: { orderId, countryCode },
}: {
  params: { orderId: string; countryCode: string };
}) => {
  const cartId = cookies().get('_medusa_cart_id')?.value;

  const cart = cartId
    ? await getCart(cartId).then((cart) => cart as any)
    : await createCart();
  const regions = await listRegions();
  const countries = regions?.flatMap((region: any) => region.countries);
  const response = await retrieveOrder(orderId);
  const order = response ? response[0] : undefined;
  const requestedSwaps = order?.swaps.filter((s) => s.confirmed_at === null);
  const items = order?.items;
  const currencyCode = getCurrency(cart.region.currency_code);
  if (order && countries && items) {
    return (
      <div>
        <Heading className="mb-5 text-primary" size="xl">
          Order:
          <span className="ml-3 text-lg font-light not-italic text-black lg:ml-6">
            {order.display_id}
          </span>
        </Heading>

        <div className="mb-4 rounded-sm border border-gray-200 p-4">
          <p className="mb-4 text-gray-400">
            Estimate delivery{' '}
            <span className="ml-2 text-black">1 — 3 Jul, 2023</span>
          </p>

          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <ul className="flex flex-wrap gap-y-2 [&>li:first-child]:ml-0 [&>li:last-child]:before:-left-4 [&>li]:relative [&>li]:ml-4 [&>li]:before:absolute [&>li]:before:-right-4 [&>li]:before:top-3.5 [&>li]:before:h-[0.0625rem] [&>li]:before:w-4 [&>li]:before:bg-gray-100 [&>li]:before:content-['']">
              <li className="before:bg-primary">
                <Tag
                  icon="package"
                  hasBorder={
                    order.fulfillment_status === 'not_fulfilled' ||
                    order.fulfillment_status === 'partially_fulfilled'
                  }
                  disabled={
                    order.fulfillment_status !== 'not_fulfilled' &&
                    order.fulfillment_status !== 'partially_fulfilled'
                  }
                >
                  Packing
                </Tag>
              </li>
              <li className='after:absolute after:-left-4 after:top-3.5 after:h-[0.0625rem] after:w-4 after:bg-gray-100 after:content-[""]'>
                <Tag
                  icon="truck"
                  hasBorder={
                    order.fulfillment_status === 'fulfilled' ||
                    order.fulfillment_status === 'partially_shipped'
                  }
                  disabled={
                    order.fulfillment_status !== 'fulfilled' &&
                    order.fulfillment_status !== 'partially_shipped'
                  }
                >
                  Delivering
                </Tag>
              </li>
              <li>
                <Tag
                  icon="check"
                  disabled={
                    order.fulfillment_status !== 'shipped' &&
                    order.fulfillment_status !== 'returned' &&
                    order.fulfillment_status !== 'partially_returned'
                  }
                  hasBorder={
                    order.fulfillment_status === 'shipped' ||
                    order.fulfillment_status === 'returned' ||
                    order.fulfillment_status === 'partially_returned'
                  }
                >
                  Delivered
                </Tag>
              </li>
            </ul>

            <Button variant="secondary">Check status</Button>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between rounded-sm border border-gray-200 p-4">
          <Icon name="calendar" className="h-4 w-4" />

          <span className="ml-4 mr-auto block text-gray-400">Order date</span>

          <span className="block">{formatDate(order.created_at)}</span>
        </div>

        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex flex-1 flex-col items-start justify-between rounded-sm border border-gray-200 p-4 sm:flex-row">
            <div className="flex gap-4">
              <Icon name="map-pin" className="mt-1.5 h-4 w-4" />

              <span className="block text-gray-400">
                Delivery
                <br /> address
              </span>
            </div>

            <ul className="sm:text-end [&>li:last-child]:mb-0 [&>li]:mb-1">
              <li>
                {order.shipping_address.first_name}{' '}
                {order.shipping_address.last_name}
              </li>
              <li>{order.shipping_address.address_1}</li>
              <li>
                {order.shipping_address.postal_code}{' '}
                {order.shipping_address.city}
              </li>
              <li>
                {
                  countries.find(
                    (country: any) =>
                      country.iso_2 === order.shipping_address.country_code
                  )?.display_name
                }
              </li>
              <li>{order.shipping_address.phone}</li>
            </ul>
          </div>

          <div className="flex flex-1 flex-col items-start justify-between gap-6 rounded-sm border border-gray-200 p-4 sm:flex-row">
            <div className="flex gap-4">
              <Icon name="receipt" className="mt-1.5 h-4 w-4" />

              <span className="block text-gray-400">
                Billing
                <br /> address
              </span>
            </div>

            <ul className="sm:text-end [&>li:last-child]:mb-0 [&>li]:mb-1">
              <li>
                {order.billing_address?.first_name}{' '}
                {order.billing_address?.last_name}
              </li>
              <li>{order.billing_address?.address_1}</li>
              <li>
                {order.billing_address?.postal_code}{' '}
                {order.billing_address?.city}
              </li>
              <li>
                {
                  countries.find(
                    (country: any) =>
                      country.iso_2 === order.billing_address?.country_code
                  )?.display_name
                }
              </li>
              <li>{order.billing_address?.phone}</li>
            </ul>
          </div>
        </div>

        <ul className="mb-4 rounded-sm border border-gray-200 p-2 [&>li:last-child]:mb-0 [&>li:last-child]:before:hidden [&>li]:relative [&>li]:mb-4 [&>li]:p-2 [&>li]:before:absolute [&>li]:before:-bottom-2 [&>li]:before:left-0 [&>li]:before:h-[0.0625rem] [&>li]:before:w-full [&>li]:before:bg-gray-100 [&>li]:before:content-['']">
          {items.map((item) => (
            <li
              className="group relative flex flex-wrap justify-between gap-8"
              key={item.id}
            >
              <Image
                src={item.thumbnail || redTShirtt}
                height={200}
                width={150}
                alt={item.title}
              />

              <div className="flex flex-1 flex-wrap justify-between gap-4 sm:flex-row">
                <ul className="relative mr-auto whitespace-nowrap text-xs [&>li:last-child]:mb-0 [&>li]:mb-1">
                  <li className="text-sm text-black">{item.title}</li>

                  <li className="text-gray-400">
                    Description:{' '}
                    <span className="ml-1 text-black">{item.description}</span>
                  </li>

                  <li className="bottom-0 text-gray-400 sm:absolute">
                    Quantity:{' '}
                    <span className="ml-1 text-black">{item.quantity}</span>
                  </li>
                </ul>

                <div className="flex justify-between gap-4 sm:h-full sm:flex-col">
                  {item.returned_quantity && (
                    <Tag variant="informative">Returned</Tag>
                  )}

                  <span className="mt-auto block self-end">
                    {currencyCode}
                    {item.total ? (item.total / 100).toFixed(2) : 0}
                  </span>
                </div>
              </div>
            </li>
          ))}

          {order.swaps.map(
            (swap) =>
              swap.confirmed_at &&
              swap.additional_items.map((item) => {
                console.log(item);
                return (
                  <li
                    className="group relative flex flex-wrap justify-between gap-8"
                    key={item.id}
                  >
                    <Image
                      src={item.thumbnail || redTShirtt}
                      height={200}
                      width={150}
                      alt={item.title}
                    />

                    <div className="flex flex-1 flex-wrap justify-between gap-4 sm:flex-row">
                      <ul className="relative mr-auto whitespace-nowrap text-xs [&>li:last-child]:mb-0 [&>li]:mb-1">
                        <li className="text-sm text-black">{item.title}</li>

                        <li className="text-gray-400">
                          Description:{' '}
                          <span className="ml-1 text-black">
                            {item.description}
                          </span>
                        </li>

                        <li className="bottom-0 text-gray-400 sm:absolute">
                          Quantity:{' '}
                          <span className="ml-1 text-black">
                            {item.quantity}
                          </span>
                        </li>
                      </ul>

                      <div className="flex justify-between gap-4 sm:h-full sm:flex-col">
                        {item.quantity === item.shipped_quantity ? (
                          <Tag variant="informative">Shipped swap</Tag>
                        ) : (
                          <Tag variant="informative">Packing swap</Tag>
                        )}

                        <span className="mt-auto block self-end">
                          {currencyCode}
                          {item.unit_price
                            ? (item.unit_price / 100).toFixed(2)
                            : 0}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })
          )}
        </ul>
        <h3>Requested swaps</h3>
        {requestedSwaps &&
          requestedSwaps.map((swap) => (
            <SingleSwap
              swap={swap}
              currencyCode={currencyCode}
              countryCode={countryCode}
            />
          ))}
        <div className="mb-4 flex flex-wrap justify-between gap-20 rounded-sm border border-gray-200 p-4">
          <div>
            <div className="mb-4 flex items-center">
              <Icon name="credit-card" className="h-4 w-4" />

              <span className="ml-4 mr-auto block text-gray-400">Payment</span>
            </div>

            <div className="flex items-start">
              <Image src={visa} height={24} width={34} alt="Visa" />

              <ul className="ml-4 [&>li:last-child]:mb-0 [&>li]:mb-2">
                <li>Jovana Jerimic</li>
                <li>**** **** **** 1111</li>
                <li>Exp: 05/26</li>
              </ul>
            </div>
          </div>

          <ul className="flex-1 sm:w-1/3 sm:flex-none [&>li:last-child]:mb-0 [&>li]:mb-1">
            <li>
              <ul className="flex justify-between gap-20">
                <li className="text-gray-400">Subtotal</li>
                <li>
                  {currencyCode}
                  {order.subtotal ? (order.subtotal / 100).toFixed(2) : 0}
                </li>
              </ul>
            </li>
            <li className="!mb-6">
              <ul className="flex justify-between gap-20">
                <li className="text-gray-400">Shipping</li>
                <li>
                  {currencyCode}
                  {order.shipping_total
                    ? (order.shipping_total / 100).toFixed(2)
                    : 0}
                </li>
              </ul>
            </li>
            <li>
              <ul className="flex justify-between gap-20 text-lg">
                <li>Total</li>
                <li>
                  {currencyCode}
                  {order.total ? (order.total / 100).toFixed(2) : 0}
                </li>
              </ul>
            </li>
            <li className="text-gray-400">Including {order.tax_total} tax</li>
          </ul>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6 rounded-sm border border-gray-200 p-4">
          <div>
            <div className="mb-9 flex items-center">
              <Icon name="undo" className="h-4 w-4" />

              <span className="ml-4 mr-auto block text-gray-400">Returns</span>
            </div>

            <p className="text-xs text-gray-500">
              Fit not right or it doesn&apos;t go with your ascetic? No worries,
              we have 30 day return policy.
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default MyAccountOrderSinglePage;
