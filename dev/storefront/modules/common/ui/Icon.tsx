'use client';
import { iconNames } from '../../../svg-sprite/icons';
import classNames from '@/utils/classNames';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: (typeof iconNames)[number];
}

export const Icon: React.FC<IconProps> = ({ name, className, ...svgProps }) => {
  return (
    <svg {...svgProps} className={classNames('block h-6 w-6', className)}>
      <use
        xlinkHref={`/icons.svg#icon-${name.replace('/', '--')}`}
        xmlnsXlink="http://www.w3.org/1999/xlink"
      />
    </svg>
  );
};

export interface BadgeIconProps {
  icon: (typeof iconNames)[number];
  value: string | number;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({ icon, value }) => {
  return (
    <div className="relative">
      <Icon name={icon} />
      <div className="absolute -top-1 left-full flex h-4 min-w-4 -translate-x-2 items-center justify-center rounded-full bg-primary px-0.5 text-xs3 font-semibold text-white">
        {value}
      </div>
    </div>
  );
};
