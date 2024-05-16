'use client';
import { SelectCountry } from '@/modules/common/components/SelectCountry';
import { Button, ButtonIcon } from '@/modules/common/ui/Button';
import * as Dialog from '@/modules/common/ui/Dialog';
import { Input } from '@/modules/common/ui/Input';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AddressCustomerInfo, AddressInfo } from '..';
import { Address, Country, Customer } from '@medusajs/medusa';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  deleteCustomerShippingAddress,
  updateCustomerShippingAddress,
} from '@/modules/account/actions';
import { updateCustomer } from '@/lib/data';

const ChangeAddressForm = ({
  countries,
  address,
  primary,
}: {
  customer: Omit<Customer, 'password_hash'> | null | undefined;
  countries: Country[];
  address: Address;
  primary: boolean;
}) => {
  const [newAddres, setNewAddres] = React.useState<AddressCustomerInfo>({
    first_name: '',
    last_name: '',
    phone: '',
    company: '',
    province: '',
    address_2: '',
    metadata: {},
  });
  const [selectedCountry, setSelectedCountry] = React.useState<
    Country | undefined
  >(undefined);
  const AddAddressInfo: ZodType<AddressInfo> = z.object({
    address_1: z.string().min(1, { message: 'Address is required' }),
    city: z
      .string()
      .min(1, { message: 'City is required' })
      .regex(/^[A-Za-z]+$/, {
        message: 'Invalid input, only letters allowed',
      }),
    postal_code: z.string().min(1, { message: 'Postal code is required' }),
    country_code: z.string().min(2, { message: 'Choose a country' }),
  });
  type FormSchemaType = z.infer<typeof AddAddressInfo>;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(AddAddressInfo),
  });

  const handleSelect = (value: Country | undefined) => {
    setSelectedCountry(value);
    setValue('country_code', value?.iso_2 || '');
  };

  const handleChangeAddress = async (data: AddressInfo, id: string) => {
    const updatedAddress = await updateCustomerShippingAddress(
      { addressId: id },
      {
        country_code: data.country_code,
        address_1: data.address_1,
        postal_code: data.postal_code,
        city: data.city,
      }
    );
    if (updatedAddress.success) {
      setSelectedCountry(undefined);
    }
  };
  const handleSetAsPrimary = async (id: string) => {
    await updateCustomer({
      metadata: {
        primary_address: id,
      },
    });
  };

  return (
    <div className="ml-auto flex min-h-full w-full flex-wrap items-end justify-between gap-4 md:w-auto md:flex-col">
      <div className="flex gap-x-4">
        {!primary && (
          <ButtonIcon
            size="lg"
            iconName="trash"
            variant="secondary"
            className="py-0"
            onPress={async () => {
              const deletedAddress = await deleteCustomerShippingAddress(
                address.id
              );
              if (deletedAddress.success) {
                //   customer=await getCustomer()
              }
            }}
          />
        )}
        <form
          onSubmit={handleSubmit((data) =>
            handleChangeAddress(data, address.id)
          )}
        >
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button
                variant="secondary"
                onPress={() => {
                  setNewAddres({
                    first_name: address.first_name || '',
                    last_name: address.last_name || '',
                    phone: address.phone || '',
                    company: address.company || '',
                    province: address.province || '',
                    address_2: address.address_2 || '',
                    metadata: address.metadata || {},
                  });
                  const country = countries.find(
                    (country) => country.iso_2 === address.country_code
                  );
                  setSelectedCountry(country);
                  setValue('address_1', address.address_1 || '');
                  setValue('city', address.city || '');
                  setValue('postal_code', address.postal_code || '');
                  setValue('country_code', address.country_code || '');
                }}
              >
                Change
              </Button>
            </Dialog.Trigger>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>Change address</Dialog.Title>
              <SelectCountry
                selectedCountry={selectedCountry}
                handleSelect={handleSelect}
                errorMessage={errors.country_code?.message}
              />
              <Controller
                name="address_1"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    label="Address"
                    wrapperClassName="flex-1 mb-4 lg:mb-8 mt-8"
                    errorMessage={errors.address_1?.message}
                    {...field}
                  />
                )}
              ></Controller>

              <Input
                type="text"
                label="Apartment, suite, etc. (Optional)"
                wrapperClassName="flex-1 mb-4 lg:mb-8"
              />

              <div className="mb-4 flex w-full gap-x-4 lg:mb-8 lg:gap-x-6">
                <Controller
                  name="postal_code"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      label="Postal code"
                      wrapperClassName="flex-1"
                      errorMessage={errors.postal_code?.message}
                      {...field}
                    />
                  )}
                ></Controller>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      label="City"
                      wrapperClassName="flex-1"
                      errorMessage={errors.city?.message}
                      {...field}
                    />
                  )}
                ></Controller>
              </div>
              <div className="flex justify-between">
                <Dialog.Close asChild>
                  <Button
                    variant="primary"
                    aria-label="Save changes"
                    type="submit"
                    isDisabled={Object.keys(errors).length > 0}
                  >
                    Save changes
                  </Button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Button variant="secondary" aria-label="Cancel">
                    Cancel
                  </Button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Root>
        </form>
      </div>

      <div>
        {!primary && (
          <Button
            variant="secondary"
            onPress={() => handleSetAsPrimary(address.id)}
          >
            Set as primary
          </Button>
        )}
        {primary && <p className="text-sm text-black">Primary address</p>}
      </div>
    </div>
  );
};

export default ChangeAddressForm;
