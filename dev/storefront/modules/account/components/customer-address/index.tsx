import { Country, Customer } from '@medusajs/medusa';
import { sortBy } from 'lodash';
import React from 'react';
import ChangeAddressForm from './change-form';
import AddAddressForm from './add-form';
import SingleAddress from '../address';

export interface AddressInfo {
  address_1: string;
  city: string;
  postal_code: string;
  country_code: string;
}
export interface AddressCustomerInfo {
  first_name: string;
  last_name: string;
  phone: string;
  company: string;
  province: string;
  address_2: string;
  metadata: object;
}

export const CustomerAddress = ({
  customer,
  countries,
}: {
  customer: Omit<Customer, 'password_hash'> | undefined | null;
  countries: Country[] | undefined;
}) => {
  const primaryAddress = customer?.shipping_addresses
    ? customer.shipping_addresses.find(
        (address) => address.id === customer?.metadata?.primary_address
      )
    : undefined;
  if (countries) {
    return (
      <li>
        <p className="mb-6 text-md">Address</p>
        {primaryAddress && (
          <div className="mb-10 flex flex-wrap justify-between gap-8 rounded-sm border border-gray-200 p-4">
            <SingleAddress address={primaryAddress} countries={countries} />
            <ChangeAddressForm
              customer={customer}
              address={primaryAddress}
              countries={countries}
              primary={true}
            />
          </div>
        )}

        {customer?.shipping_addresses?.length &&
          customer?.shipping_addresses?.length >= 1 &&
          sortBy(
            customer.shipping_addresses,
            (address) => address.created_at
          ).map(
            (address) =>
              address.id !== customer?.metadata?.primary_address && (
                <div
                  className="mb-10 flex flex-wrap justify-between gap-8 rounded-sm border border-gray-200 p-4"
                  key={address.id}
                >
                  <SingleAddress address={address} countries={countries} />
                  <ChangeAddressForm
                    customer={customer}
                    address={address}
                    countries={countries}
                    primary={false}
                  />
                </div>
              )
          )}

        <AddAddressForm customer={customer} countries={countries} />
      </li>
    );
  }
};

export default CustomerAddress;
