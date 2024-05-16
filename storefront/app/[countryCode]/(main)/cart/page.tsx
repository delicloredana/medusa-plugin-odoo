import * as React from 'react';
import { Heading } from '@/modules/common/ui/Heading';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getCart, getRegion } from '@/lib/data';
import { enrichLineItems } from '@/modules/cart/actions';
import { LineItem } from '@medusajs/medusa';
import { getCheckoutStep } from '@/lib/util/getCheckoutStep';
import { sortBy } from 'lodash';
import Link from 'next/link';
import { Tag } from '@/modules/common/ui/Tag';
import { getCurrency } from '@/utils/prices';
import { Button } from '@/modules/common/ui/Button';
import ChartItem from '@/modules/cart/components/cartItem';
import freshBag from '../../../../public/images/content/item-fresh-bag-white.png';
import Image from 'next/image';
export const metadata: Metadata = {
  title: 'Cart',
  description: 'View your cart',
};

const fetchCart = async () => {
  const cartId = cookies().get('_medusa_cart_id')?.value;

  if (!cartId) {
    return null;
  }

  const cart = await getCart(cartId).then((cart) => cart as any);

  if (!cart) {
    return null;
  }

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id);
    cart.items = enrichedItems as LineItem[];
  }

  cart.checkout_step = cart && getCheckoutStep(cart);

  return cart;
};
const CartPage = async ({
  params: { countryCode },
}: {
  params: { countryCode: string };
}) => {
  const cart = await fetchCart();
  const region = await getRegion(countryCode);
  const currencyCode = region?.currency_code;
  if (!cart) {
    return <></>;
  }
  if (cart.items.length > 0) {
    return (
      <main className="px-4 py-12 lg:px-24 lg:pb-40 lg:pt-18">
        <div className="grid grid-cols-12 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-8 xl:col-span-9">
            <Heading className="mb-8 text-primary lg:mb-13.5" size="xl4">
              Your shopping bag ({cart.items.length})
            </Heading>
            <ul className="[&>li:first-child]:border-t [&>li:last-child]:border-0 [&>li:last-child]:pb-0 [&>li]:border-b [&>li]:border-gray-200 [&>li]:py-8">
              {sortBy(cart.items, (item) => item.created_at)?.map((item) => (
                <li key={item.id}>
                  <div className="group relative flex items-center justify-between">
                    <Link href="/" className="relative block flex-shrink-0">
                      <Image
                        src={item.thumbnail || freshBag}
                        height={144}
                        width={108}
                        alt={item.title}
                      />
                      {item.discount_total !== 0 && (
                        <Tag
                          variant="discount"
                          className="absolute bottom-2 right-2 text-xs2"
                        >
                          {item.discount_total}
                        </Tag>
                      )}
                    </Link>

                    <ChartItem item={item} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 mt-6 border-t border-gray-200 pt-8 lg:col-span-4 lg:mt-9.25 lg:border-t-0 lg:pt-0 xl:col-span-3">
            <ul className="mb-10">
              <li className="mb-3.5 text-gray-400">
                <ul className="flex justify-between">
                  <li>Subtotal:</li>
                  <li className="text-black">
                    {getCurrency(currencyCode)}
                    {cart.total ? (cart.total / 100).toFixed(2) : 0}
                  </li>
                </ul>
              </li>
              <li className="mb-6 border-b border-gray-200 pb-5.5 text-gray-400">
                <ul className="flex justify-between">
                  <li>Shipping:</li>
                  <li className="text-black">
                    {!cart.shipping_total || cart.shipping_total === 0
                      ? 'Free'
                      : (cart.shipping_total / 100).toFixed(2)}
                  </li>
                </ul>
              </li>
              <li className="text-lg font-semibold">
                <ul className="flex justify-between">
                  <li>Total:</li>
                  <li>
                    {getCurrency(currencyCode)}
                    {cart.total ? (cart.total / 100).toFixed(2) : 0}
                  </li>
                </ul>
              </li>
            </ul>
            <Link
              href={`/${countryCode}` + '/checkout?step=' + cart.checkout_step}
            >
              <Button
                size="lg"
                className="w-full"
                isDisabled={cart.items.length < 1}
              >
                Proceed to checkout
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  } else {
    return <main className="px-4 py-12 lg:px-24 lg:pb-40 lg:pt-18"></main>;
  }
};

export default CartPage;
