'use client';

import { Input } from '@/modules/common/ui/Input';
import { Button } from '@/modules/common/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import { signUp } from '../../actions';
import { useFormState } from 'react-dom';

export interface RegisterInfo {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}
const RegisterForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const RegisterUser: ZodType<RegisterInfo> = z
    .object({
      first_name: z
        .string()
        .min(1, { message: 'Firstname is required' })
        .regex(/^[A-Za-z]+$/, {
          message: 'Invalid input, only letters allowed',
        }),
      last_name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(4),
      confirm_password: z.string().min(4),
    })
    .superRefine(async ({ confirm_password, password, email }, ctx) => {
      if (confirm_password !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'The passwords did not match',
          path: ['confirm_password'],
        });
      }
      // if (email !== '') {
      //   if (await checkIfCustomerExists(email)) {
      //     ctx.addIssue({
      //       code: 'custom',
      //       message: 'User already exists',
      //       path: ['email'],
      //     });
      //   }
      // }
    });
  const [message, formAction] = useFormState(signUp, null);
  type FormSchemaType = z.infer<typeof RegisterUser>;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(RegisterUser),
  });
  const onSubmit = async (data: RegisterInfo) => {
    if (data.confirm_password === data.password) {
      setIsLoading(true);
      formAction({
        first_name: data.first_name,
        password: data.password,
        last_name: data.last_name,
        email: data.email,
      });

      
    }
  };

  return (
    <form
      id="register"
      className="mb-4 xl:mb-16"
      onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
    >
      <div className="mb-4 flex flex-col gap-x-6 gap-y-4 sm:flex-row lg:mb-8 lg:gap-y-8">
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
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            type="email"
            label="Email"
            wrapperClassName="mb-4 lg:mb-8"
            errorMessage={errors.email?.message}
            {...field}
          />
        )}
      ></Controller>
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            type="password"
            label="Password"
            wrapperClassName="mb-4 lg:mb-8"
            errorMessage={errors.password?.message}
            {...field}
          />
        )}
      ></Controller>
      <Controller
        name="confirm_password"
        control={control}
        render={({ field }) => (
          <Input
            type="password"
            label="Confirm Password"
            wrapperClassName="mb-8"
            errorMessage={errors.confirm_password?.message}
            {...field}
          />
        )}
      ></Controller>
      <Button size="lg" className="w-full" isLoading={isLoading} type="submit">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
