'use client';

import * as React from 'react';
import { NumberFieldStateOptions, useNumberFieldState } from 'react-stately';
import { AriaNumberFieldProps, useLocale, useNumberField } from 'react-aria';
import { useMergeRefs } from '@chakra-ui/react-use-merge-refs';
import classNames from '@/utils/classNames';
import { Icon } from '@/modules/common/ui/Icon';
import { RawButton } from '@/modules/common/ui/Button';

export interface QuantityInputProps
  extends Omit<NumberFieldStateOptions, 'locale'>,
    AriaNumberFieldProps {
  locale?: NumberFieldStateOptions['locale'];
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const QuantityInput = React.forwardRef<
  HTMLInputElement,
  QuantityInputProps
>(
  (
    {
      variant = 'primary',
      className,
      minValue = 0,
      'aria-label': ariaLabel = 'Quantity',
      ...rest
    },
    ref
  ) => {
    const props = {
      ...rest,
      minValue,
      'aria-label': ariaLabel,
    };

    const { locale } = useLocale();
    const state = useNumberFieldState({ locale, ...props });
    const inputRef = React.useRef(null);
    const mergedRef = useMergeRefs(ref, inputRef);
    const {
      groupProps,
      inputProps,
      incrementButtonProps,
      decrementButtonProps,
    } = useNumberField(props, state, inputRef);

    return (
      <div
        {...groupProps}
        className={classNames(
          'inline-flex h-11 items-center justify-between rounded-full disabled:cursor-not-allowed',
          {
            'bg-gray-50 px-3.5': variant === 'primary',
          },
          className
        )}
      >
        <RawButton
          {...decrementButtonProps}
          className="group disabled:cursor-not-allowed disabled:text-gray-400"
        >
          <Icon
            name="minus"
            className={classNames(
              'transition-all hover:text-primary group-disabled:hover:!text-gray-400',
              {
                'h-4 w-4': variant === 'primary',
              }
            )}
          />
        </RawButton>

        <input
          {...inputProps}
          ref={mergedRef}
          className={classNames(
            'outer-spin-button-none w-15.5 bg-transparent text-center text-xs outline-none disabled:cursor-not-allowed disabled:text-gray-400',
            {
              "relative w-14 before:absolute before:-bottom-2 before:left-3.5 before:w-8 before:border-b before:border-gray-900 before:content-['']":
                variant === 'secondary',
            }
          )}
        />

        <RawButton
          {...incrementButtonProps}
          className="group disabled:cursor-not-allowed disabled:text-gray-400"
        >
          <Icon
            name="plus"
            className={classNames(
              'transition-all hover:text-primary group-disabled:hover:!text-gray-400',
              { 'h-4 w-4': variant === 'primary' }
            )}
          />
        </RawButton>
      </div>
    );
  }
);
QuantityInput.displayName = 'QuantityInput';
