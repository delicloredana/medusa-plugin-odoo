"use client"
import classNames from '@/utils/classNames';
import { Icon, IconProps } from '@/modules/common/ui/Icon';

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  colorScheme?: 'primary' | 'secondary';
  visualSize?: 'sm' | 'lg';
  label?: string;
  errorMessage?: string;
  wrapperClassName?: string;
  icon?: IconProps['name'];
}

export const Input: React.FC<InputProps> = ({
  /* custom props */
  colorScheme = 'primary',
  visualSize = 'lg',
  label,
  errorMessage,
  wrapperClassName,
  icon,

  /* input props */
  type,
  disabled,
  className,
  ...inputProps
}) => {
  const sizeClasses = {
    'placeholder-shown:!px-6 placeholder-shown:!py-4 !pt-6 !pb-2 px-6 lg:px-6':
      visualSize === 'sm',
    'placeholder-shown:!py-3 !pt-4.5 !pb-1.5 lg:placeholder-shown:!py-5 lg:!pt-7 lg:!pb-3':
      visualSize === 'lg',
  };

  const labelSizeClasses = {
    'top-2.5 left-6 peer-placeholder-shown:!translate-y-2.5 lg:peer-placeholder-shown:!translate-y-2':
      visualSize === 'sm',
    'top-1 left-2.5 peer-placeholder-shown:translate-y-3 lg:top-3 lg:left-4.5 lg:peer-placeholder-shown:translate-y-2.5':
      visualSize === 'lg',
  };

  return (
    <div className={classNames('relative', wrapperClassName)}>
      <input
        {...inputProps}
        type={type}
        disabled={disabled}
        className={classNames(
          baseClasses,
          sizeClasses,
          { 'border-primary !text-primary': colorScheme === 'secondary' },
          { 'pointer-events-none bg-gray-50': disabled },
          { '!border-red-700': Boolean(errorMessage) },
          {
            '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none':
              type === 'number' || type === 'phone',
          },
          { 'placeholder:opacity-100': inputProps.placeholder },
          className
        )}
        placeholder={inputProps.placeholder ?? ' '}
        />

{label && (
        <label
          className={classNames(
            labelBaseClasses,
            labelSizeClasses,
            { 'text-primary': colorScheme === 'secondary' },
            { 'text-gray-200': disabled }
          )}
        >
          {label}
        </label>
      )}

      {Boolean(errorMessage) && (
        <span className="helper-message absolute -bottom-6 left-0 text-xs2 text-red-700">
          {errorMessage}
        </span>
      )}

      {icon && (
        <Icon
          name={icon}
          className="absolute right-2 top-3.5 h-4 w-4 lg:right-4 lg:top-4.5 lg:h-auto lg:w-auto"
        />
      )}
    </div>
  );
};

export const baseClasses = [
  'peer',
  'w-full',
  'leading-none',
  'px-2',
  'lg:px-4',
  'border',
  'bg-transparent',
  'text-sm',
  'text-gray-900',
  'transition-all',
  'rounded-[0.25rem]',
  'hover:border-primary',
  'focus-visible:border-primary',
  'focus-visible:outline-0',
  'placeholder:opacity-0',
];

export const labelBaseClasses = [
  'absolute',
  'text-gray-400',
  'text-xs2',
  'transition-all',
  'pointer-events-none',
  'peer-placeholder-shown:text-xs',
  'lg:peer-placeholder-shown:text-sm',
];
