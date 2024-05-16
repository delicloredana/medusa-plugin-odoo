import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/modules/common/ui/Button';
import { Tag } from '@/modules/common/ui/Tag';
import { Heading } from '@/modules/common/ui/Heading';
import { listCustomerOrders } from '@/lib/data';
import Link from 'next/link';
import redTShirt from '../../../../../../public/images/content/red-t-shirt.jpg';

export const formatDate = (date: Date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
};
const MyAccountOrdersPage = async ({
  params: { countryCode },
}: {
  params: { countryCode: string };
}) => {
  const orders = await listCustomerOrders(10, 0);

  if (!orders) {
    return (
      <div>
        <Heading className="mb-8 text-primary lg:mb-15">My orders</Heading>
        <p>You haven’t order anything yet.</p>
      </div>
    );
  }

  if (orders) {
    return (
      <div>
        <Heading className="mb-8 text-primary lg:mb-15">My orders</Heading>

        <ul className="[&>li:last-child]:mb-0 [&>li]:mb-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="rounded-sm border border-gray-200 p-4"
            >
              <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
                <ul>
                  <li className="mb-2 text-md text-primary">
                    Order:{' '}
                    <span className="ml-1 text-black">{order.display_id}</span>
                  </li>

                  <li className="text-xs text-gray-400">
                    Order date:{' '}
                    <span className="ml-2 text-black">
                      {formatDate(order.created_at)}
                    </span>
                  </li>
                </ul>

                <ul className="flex [&>li:last-child]:mr-0 [&>li]:mr-4">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      <Image
                        src={item.thumbnail || redTShirt}
                        height={100}
                        width={75}
                        alt={item.title}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  {(order.fulfillment_status === 'not_fulfilled' ||
                    order.fulfillment_status === 'partially_fulfilled') && (
                    <Tag icon="package">Packing</Tag>
                  )}
                  {(order.fulfillment_status === 'fulfilled' ||
                    order.fulfillment_status === 'partially_shipped') && (
                    <Tag icon="truck">Delivering</Tag>
                  )}
                  {(order.fulfillment_status === 'shipped' ||
                    order.fulfillment_status === 'returned' ||
                    order.fulfillment_status === 'partially_returned') && (
                    <Tag icon="check">Delivered</Tag>
                  )}

                  <p className="text-xs2 text-gray-400">
                    Estimate delivery:{' '}
                    <span className="ml-1 text-black">29 June 2023</span>
                  </p>
                </div>
                <Link href={`/${countryCode}/my-account/orders/${order.id}`}>
                  <Button variant="secondary">Check status</Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default MyAccountOrdersPage;
