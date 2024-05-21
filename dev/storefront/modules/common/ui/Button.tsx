'use client';

import * as React from 'react';
import classNames from '@/utils/classNames';
import { Icon, IconProps } from '@/modules/common/ui/Icon';
import { AriaButtonProps, useButton } from 'react-aria';
import { useMergeRefs } from '@chakra-ui/react-use-merge-refs';
import { LoadingSpinner } from './LoadingSpinner';

export interface RawButtonProps extends AriaButtonProps<'button'> {
  className?: string;
}

export const RawButton = React.forwardRef<HTMLButtonElement, RawButtonProps>(
  ({ className, children, type = 'button', ...rest }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const mergedRef = useMergeRefs(ref, buttonRef);
    const props = {
      ...rest,
      type,
    };
    const { buttonProps } = useButton(props, buttonRef);

    return (
      <button {...buttonProps} className={className} ref={mergedRef}>
        {children}
      </button>
    );
  }
);
RawButton.displayName = 'RawButton';

export interface ButtonProps extends RawButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'dark';
  size?: 'sm' | 'lg';
  isLoading?: boolean;
}

const baseButtonClasses = [
  'transition-all',
  'flex',
  'items-center',
  'justify-center',
  'relative',
  'italic',
  'font-black',
  'rounded-sm',
  '!leading-none',
  'disabled:pointer-events-none',
];

const getButtonVariantClasses = (
  variant: ButtonProps['variant'] = 'primary'
) => {
  if (variant === 'secondary') {
    return 'border border-primary text-primary hover:border-primary-900 hover:text-primary-900 disabled:border-primary-100';
  }

  if (variant === 'tertiary') {
    return 'bg-gray-400 text-gray-10 hover:bg-gray-600 disabled:bg-gray-100';
  }

  if (variant === 'dark') {
    return 'border border-white text-white bg-transparent hover:bg-transparent hover:border-primary-400 hover:text-primary-400 disabled:!border-gray-400 disabled:!text-gray-400';
  }

  return 'bg-primary text-gray-10 hover:bg-primary-900 disabled:bg-primary-100';
};

const getButtonSizeClasses = (size: ButtonProps['size'] = 'sm') => {
  if (size === 'lg') {
    return 'text-xs py-3 px-6 lg:text-sm lg:py-4 lg:px-8';
  }

  return 'text-xs py-3 px-6';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      variant = 'primary',
      size = 'sm',
      isLoading,
      className,
      ...rest
    } = props;

    return (
      <RawButton
        {...rest}
        ref={ref}
        className={classNames(
          baseButtonClasses,
          getButtonVariantClasses(variant),
          getButtonSizeClasses(size),
          className
        )}
      >
        {children}
        {isLoading && (
          <LoadingSpinner
            className={classNames(
              'ml-2',
              variant === 'primary' && 'fill-primary text-white',
              variant === 'secondary' && 'fill-white text-primary',
              variant === 'tertiary' && 'fill-gray-400 text-white',
              size === 'sm' && '!w-3',
              size === 'lg' && '!w-4'
            )}
          ></LoadingSpinner>
        )}
      </RawButton>
    );
  }
);
Button.displayName = 'Button';

export interface ButtonIconProps extends Omit<ButtonProps, 'children'> {
  iconName: IconProps['name'];
}

export const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ className, iconName, size, variant = 'primary', ...rest }, ref) => {
    return (
      <RawButton
        {...rest}
        ref={ref}
        className={classNames(
          'p-3',
          baseButtonClasses,
          getButtonVariantClasses(variant),
          className
        )}
      >
        <Icon
          name={iconName}
          className={classNames(
            '[&>path]:fill-gray-10',
            { 'h-4 w-4': size === 'sm' },
            { 'h-4 w-4 lg:h-6 lg:w-6': size === 'lg' }
          )}
        />
      </RawButton>
    );
  }
);
ButtonIcon.displayName = 'ButtonIcon';
