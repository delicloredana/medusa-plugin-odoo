'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import * as Dialog from '@/modules/common/ui/Dialog';
import { Button } from '@/modules/common/ui/Button';
import { Input } from '@/modules/common/ui/Input';
import { Customer } from '@medusajs/medusa';
import { getCustomer, updateCustomer } from '@/lib/data';
import React from 'react';
interface CustomerInfo {
  first_name: string;
  last_name: string;
  phone: string;
}

const CustomerInfo = ({
  customer,
}: {
  customer: Omit<Customer, 'password_hash'> | null;
}) => {
  // const [customerInfo, setCustomerInfo] = React.useState(customer);
  const UpdateCustomerInfo: ZodType<CustomerInfo> = z.object({
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
        /(^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$)|(^(?!.*\S))/
      ),
  });
  type FormSchemaType = z.infer<typeof UpdateCustomerInfo>;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(UpdateCustomerInfo),
  });
  const changeUserInfo = async (data: CustomerInfo) => {
    await updateCustomer(data);
    const updatedCustomer = await getCustomer();
  };
  if (customer) {
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            variant="secondary"
            className="self-start"
            onPress={() => {
              setValue('first_name', customer?.first_name || '');
              setValue('last_name', customer?.last_name || '');
              setValue('phone', customer?.phone || '');
            }}
          >
            Change
          </Button>
        </Dialog.Trigger>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Personal information</Dialog.Title>
          <form
            onSubmit={handleSubmit(changeUserInfo, (err) => console.log(err))}
          >
            <div className="mb-4 flex w-full gap-x-4 lg:mb-8 lg:gap-x-6">
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    label="First Name"
                    wrapperClassName="flex-1"
                    errorMessage={errors.first_name?.message}
                    {...field}
                  />
                )}
              ></Controller>
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    label="Last Name"
                    wrapperClassName="flex-1"
                    errorMessage={errors.last_name?.message}
                    {...field}
                  />
                )}
              ></Controller>
            </div>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  label="Phone"
                  errorMessage={errors.phone?.message}
                  wrapperClassName="mb-4 lg:mb-10"
                  {...field}
                />
              )}
            ></Controller>

            <div className="flex justify-between">
              <Dialog.Close asChild>
                <Button
                  variant="primary"
                  type="submit"
                  aria-label="Save changes"
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
          </form>
        </Dialog.Content>
      </Dialog.Root>
    );
  }
};

export default CustomerInfo;
