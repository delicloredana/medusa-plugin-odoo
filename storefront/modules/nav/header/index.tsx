import * as React from 'react';
import {
  createCart,
  getCart,
  getCustomer,
  getRegion,
  listCustomerOrders,
  listRegions,
} from '@/lib/data';
import { cookies } from 'next/headers';
import HeaderClient from './client';

export interface HeaderProps {
  isAbsolute?: boolean;
  colorScheme?: 'primary' | 'inverted';
  countryCode?: string;
}
export const Header: React.FC<HeaderProps> = async ({
  isAbsolute = false,
  colorScheme = 'primary',
  countryCode = '',
}) => {
  const regions = await listRegions();
  const countries = regions?.flatMap((region: any) => region.countries);
  const region = await getRegion(countryCode);
  const customer = await getCustomer();
  const orders = customer ? await listCustomerOrders() : [];
  const cartId = cookies().get('_medusa_cart_id')?.value;

  let cart = cartId ? await getCart(cartId).then((cart) => cart) : undefined;
  if (countries) {
    return (
      <>
        <HeaderClient
          regions={regions}
          countries={countries}
          region={region}
          orders={orders}
          colorScheme={colorScheme}
          isAbsolute={isAbsolute}
          cart={cart}
        />
      </>
    );
  }
};
