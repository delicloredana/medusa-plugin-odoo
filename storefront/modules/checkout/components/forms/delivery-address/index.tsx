'use client';
import { Cart, Country } from '@medusajs/medusa';
import { Input } from '@/modules/common/ui/Input';
import { useForm } from 'react-hook-form';
import React from 'react';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateCart } from '@/lib/data';
import { SelectCountry } from '@/modules/common/components/SelectCountry';
import { Button } from '@/modules/common/ui/Button';
import { DeliveryAddressFormInput } from './input';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { updateRegion } from '@/app/actions';
interface AddAddressFormProps {
  countries: Country[] | undefined;
  cart: Omit<Cart, 'refunded_total' | 'refundable_amount'> | undefined | null;
}
export interface ShippingAddress {
  first_name: string;
  last_name: string;
  phone: string;
  address_1: string;
  city: string;
  postal_code: string;
  country_code: string;
}
export const DeliveryAddressForm: React.FC<AddAddressFormProps> = ({
  cart,
  countries,
}) => {
  const params = useParams();
  const currentPath = usePathname()?.split(`/${params?.countryCode}`)[1];
  const [selectedCountry, setSelectedCountry] = React.useState<
    Country | undefined
  >(undefined);
  const AddAddressInfo: ZodType<ShippingAddress> = z.object({
    address_1: z.string().min(1, { message: 'Address is required' }),
    city: z
      .string()
      .min(1, { message: 'City is required' })
      .regex(/^[A-Za-z]+$/, {
        message: 'Invalid input, only letters allowed',
      }),
    postal_code: z.string().min(1, { message: 'Postal code is required' }),
    first_name: z
      .string()
      .min(1, { message: 'First name is required' })
      .regex(/^[A-Za-z]+$/, {
        message: 'Invalid input, only letters allowed',
      }),
    last_name: z
      .string()
      .min(1, { message: 'Last name is required' })
      .regex(/^[A-Za-z]+$/, {
        message: 'Invalid input, only letters allowed',
      }),
    phone: z
      .string()
      .regex(
        /(^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$)|(^(?!.*\S))/,
        { message: 'Enter number or leave empty' }
      ),
    country_code: z.string().min(2, { message: 'Choose a country' }),
  });
  type FormSchemaType = z.infer<typeof AddAddressInfo>;
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(AddAddressInfo),
  });
  const settingValuesInForm = () => {
    setValue('address_1', cart?.shipping_address?.address_1 || '');
    setValue('city', cart?.shipping_address?.city || '');
    setValue(
      'country_code',
      cart?.shipping_address?.country_code ||
        (params?.countryCode as string) ||
        ''
    );
    setValue('first_name', cart?.shipping_address?.first_name || '');
    setValue('last_name', cart?.shipping_address?.last_name || '');
    setValue('phone', cart?.shipping_address?.phone || '');
    setValue('postal_code', cart?.shipping_address?.postal_code || '');
  };
  const handleSelect = async (value: Country | undefined) => {
    setSelectedCountry(value);

    setValue('country_code', value?.iso_2 || '');
  };
  const handleAddAddress = async (data: ShippingAddress) => {
    await updateCart(cart?.id || '', {
      shipping_address: {
        ...data,
        metadata: {},
        province: '',
        company: '',
        address_2: '',
      },
    });
    // await updateRegion(selectedCountry?.iso_2 || '', currentPath || '');
    router.push(
      cart?.type === 'swap'
        ? `/${params?.countryCode}/swap/${cart?.id}?step=delivery`
        : `/${data.country_code}/checkout?step=delivery`
    );
    // setStep(3);
  };
  React.useEffect(() => {
    settingValuesInForm();
    if (!cart?.shipping_address?.country_code) {
      const country = countries?.find(
        (country) => country.iso_2 === params?.countryCode
      );
      handleSelect(country);
    } else {
      const country = countries?.find(
        (country) => country.iso_2 === cart.shipping_address?.country_code
      );
      handleSelect(country);
    }
  }, [cart?.id]);
  return (
    <form onSubmit={handleSubmit(handleAddAddress)}>
      <fieldset className="relative flex flex-col flex-wrap gap-y-4 lg:gap-y-8">
        <SelectCountry
          selectedCountry={selectedCountry}
          handleSelect={handleSelect}
          errorMessage={errors.country_code?.message}
          regionId={cart?.region_id}
        />
        <div className="flex gap-x-4 lg:gap-x-12">
          <DeliveryAddressFormInput
            name="first_name"
            label="First Name"
            errors={errors}
            control={control}
            type="text"
          />
          <DeliveryAddressFormInput
            name="last_name"
            label="Last Name"
            errors={errors}
            control={control}
            type="text"
          />
        </div>
        <DeliveryAddressFormInput
          name="address_1"
          label="Address"
          errors={errors}
          control={control}
          type="text"
        />
        <Input
          type="text"
          label="Apartment, suite, etc. (Optional)"
          name="apartment"
        />
        <div className="flex gap-x-4 lg:gap-x-12">
          <DeliveryAddressFormInput
            name="postal_code"
            label="Postal Code"
            errors={errors}
            control={control}
            type="number"
          />
          <DeliveryAddressFormInput
            name="city"
            label="City"
            errors={errors}
            control={control}
            type="text"
          />
        </div>
        <DeliveryAddressFormInput
          name="phone"
          label="Phone"
          errors={errors}
          control={control}
          type="text"
        />
      </fieldset>
      <Button
        type="submit"
        size="lg"
        className="mt-10"
        isDisabled={Object.keys(errors).length > 0}
      >
        Next
      </Button>
    </form>
  );
};
