import * as React from 'react';
import classNames from '@/utils/classNames';
import { Icon, IconProps } from '@/modules/common/ui/Icon';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'informative' | 'discount';
  icon?: IconProps['name'];
  hasBorder?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  variant = 'primary',
  icon,
  hasBorder,
  disabled,
  children,
  className,
  ...divProps
}) => {
  return (
    <div
      className={classNames(
        'inline-flex h-6 items-center justify-center rounded-full bg-primary-100 px-4 text-xs3 text-gray-600 md:text-xs2',
        { 'bg-yellow': variant === 'informative' },
        { 'bg-red-700 !text-white': variant === 'discount' },
        { 'border border-primary': variant === 'primary' && hasBorder },
        { 'pointer-events-none bg-gray-50 text-gray-200': disabled },
        className
      )}
      {...divProps}
    >
      {icon && (
        <div className="mr-2">
          <Icon
            name={icon}
            className={classNames('h-3 w-3 text-gray-900', {
              'text-white': variant === 'discount',
            })}
          />
        </div>
      )}

      <span className="leading-none">{children}</span>
    </div>
  );
};
