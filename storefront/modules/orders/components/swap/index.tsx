import { Swap } from '@medusajs/medusa';

import React from 'react';

import { Button } from '@/modules/common/ui/Button';
import Image from 'next/image';
import redTShirtt from '../../../../public/images/content/red-t-shirt.jpg';
import { Tag } from '@/modules/common/ui/Tag';
import Link from 'next/link';

const SingleSwap = async ({
  swap,
  currencyCode,
  countryCode,
}: {
  swap: Swap;
  currencyCode: string;
  countryCode: string;
}) => {
  if (swap) {
    return (
      <div>
        <ul className="mb-4 rounded-sm border border-gray-200 p-2 [&>li:last-child]:mb-0 [&>li:last-child]:before:hidden [&>li]:relative [&>li]:mb-4 [&>li]:p-2 [&>li]:before:absolute [&>li]:before:-bottom-2 [&>li]:before:left-0 [&>li]:before:h-[0.0625rem] [&>li]:before:w-full [&>li]:before:bg-gray-100 [&>li]:before:content-['']">
          {swap.additional_items.map((item) => (
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
                  <Tag variant="informative">Receive</Tag>
                  <span className="mt-auto block self-end">
                    {currencyCode}
                    {item.unit_price ? (item.unit_price / 100).toFixed(2) : 0}
                  </span>
                </div>
              </div>
            </li>
          ))}
          {swap.return_order.items.map((item) => (
            <li
              className="group relative flex flex-wrap justify-between gap-8"
              key={item.item.id}
            >
              <Image
                src={item.item.thumbnail || redTShirtt}
                height={200}
                width={150}
                alt={item.item.title}
              />

              <div className="flex flex-1 flex-wrap justify-between gap-4 sm:flex-row">
                <ul className="relative mr-auto whitespace-nowrap text-xs [&>li:last-child]:mb-0 [&>li]:mb-1">
                  <li className="text-sm text-black">{item.item.title}</li>

                  <li className="text-gray-400">
                    Description:{' '}
                    <span className="ml-1 text-black">
                      {item.item.description}
                    </span>
                  </li>

                  <li className="bottom-0 text-gray-400 sm:absolute">
                    Quantity:{' '}
                    <span className="ml-1 text-black">
                      -{item.requested_quantity}
                    </span>
                  </li>
                </ul>

                <div className="flex justify-between gap-4 sm:h-full sm:flex-col">
                  <Tag variant="informative">Return</Tag>
                  <span className="mt-auto block self-end">
                    -{currencyCode}
                    {item.item.unit_price
                      ? (item.item.unit_price / 100).toFixed(2)
                      : 0}
                  </span>
                </div>
              </div>
            </li>
          ))}
          <li className="group relative flex flex-wrap justify-between gap-8">
            <p>Shipping for return: </p>
            <p className="ml-1 text-black">
              {currencyCode}{' '}
              {(swap.return_order.shipping_method.price / 100).toFixed(2)}
            </p>
          </li>{' '}
          <Link href={`/${countryCode}/swap/${swap.cart_id}`}>
            <Button>Complete swap</Button>
          </Link>
        </ul>
      </div>
    );
  }
};

export default SingleSwap;
