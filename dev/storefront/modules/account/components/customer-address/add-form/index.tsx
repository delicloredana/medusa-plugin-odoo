'use client';
import { SelectCountry } from '@/modules/common/components/SelectCountry';
import { Button } from '@/modules/common/ui/Button';
import * as Dialog from '@/modules/common/ui/Dialog';
import { Input } from '@/modules/common/ui/Input';
import { Country, Customer } from '@medusajs/medusa';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AddressCustomerInfo, AddressInfo } from '..';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCustomerShippingAddress } from '@/modules/account/actions';
import { useParams } from 'next/navigation';

const AddAddressForm = ({
  customer,
  countries,
}: {
  customer: Omit<Customer, 'password_hash'> | undefined | null;
  countries: Country[];
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
  const params = useParams();
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
  const handleAddAddress = async (data: AddressInfo) => {
    const addedAddress = await addCustomerShippingAddress({
      ...data,
      ...newAddres,
    });
    if (addedAddress.success) {
      setSelectedCountry(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleAddAddress, (err) => console.log(err))}>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            variant="primary"
            size="lg"
            onPress={() => {
              setNewAddres({
                first_name: customer?.first_name || '',
                last_name: customer?.last_name || '',
                phone: '',
                company: '',
                province: '',
                address_2: '',
                metadata: {},
              });

              setValue('city', '');
              setValue('address_1', '');
              setValue('postal_code', '');
              setValue('country_code', (params?.countryCode as string) || '');
              const country = countries.find(
                (country) =>
                  country.iso_2 === (params?.countryCode as string) || ''
              );
              setSelectedCountry(country);
            }}
          >
            Add another address
          </Button>
        </Dialog.Trigger>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Add address</Dialog.Title>

          <SelectCountry
            handleSelect={handleSelect}
            selectedCountry={selectedCountry}
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
                Add address
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
  );
};
export default AddAddressForm;
