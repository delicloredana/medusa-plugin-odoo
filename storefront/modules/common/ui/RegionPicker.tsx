'use client';
import { updateRegion } from '@/app/actions';
import classNames from '@/utils/classNames';
import { Country, Region } from '@medusajs/medusa';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

export interface RegionPickerProps extends React.PropsWithChildren {
  className?: string;
  colorScheme?: string;
  region: Region | null | undefined;
  regions: Region[] | null | undefined;
  countries: Country[];
}

export interface RegionMedusa {
  regionId: string;
}
export const RegionPicker: React.FC<RegionPickerProps> = ({
  className,
  colorScheme,
  region,
  regions,
  countries,
}) => {
  const a = useParams();
  const currentPath = usePathname()?.split(`/${a?.countryCode}`)[1];
  if (countries) {
    return (
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <button className="flex uppercase focus-visible:outline-none">
            <span
              className={classNames(
                'border-r-[0.0938rem] border-gray-900 pr-[0.5625rem]',
                { 'border-white': colorScheme === 'inverted' },
                className
              )}
            >
              {a?.countryCode || regions?.[0]?.countries?.[0]?.iso_2}
            </span>
            <span className="pl-2">
              {regions?.find((r: any) => r.id === region?.id)?.currency_code ||
                regions?.[0]?.currency_code}
            </span>
          </button>
        </Dropdown.Trigger>

        <Dropdown.Content
          className="dropdown-content w-56.5"
          sideOffset={29}
          align="end"
        >
          {countries.map((country: any) => {
            return (
              <Dropdown.Item
                className={classNames(
                  a?.countryCode === country.iso_2 &&
                    'font-black italic text-primary',
                  'dropdown-item hover:bg-transparent'
                )}
                id={country.iso_2}
                onClick={async () => {
                  await updateRegion(country.iso_2, currentPath || '');
                }}
                key={country.id}
              >
                {country.display_name.toUpperCase()}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Content>
      </Dropdown.Root>
    );
  }
};
