'use client';
import * as React from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import classNames from '@/utils/classNames';
import { baseClasses, labelBaseClasses } from '@/modules/common/ui/Input';
import { Icon } from '@/modules/common/ui/Icon';
import { Country } from '@medusajs/medusa';
import { } from '@/lib/data';
import {  useRegions } from 'medusa-react';

export interface SelectCountryProps {
  errorMessage?: string;
  regionId?: string;
  disabled?: boolean;
  handleSelect?: (value: Country | undefined) => void;
  selectedCountry?: Country | undefined;
}

export const SelectCountry: React.FC<SelectCountryProps> = ({
  errorMessage,
  regionId,
  disabled,
  handleSelect,
  selectedCountry,
}) => {
  const {regions }= useRegions();
  const countries = regions?.flatMap((region) => region.countries);
  if (countries)
    return (
      <div className="dropdown-full-width">
        <Dropdown.Root>
          <Dropdown.Trigger asChild disabled={disabled}>
            <button className="dropdown-trigger w-full">
              <div className="relative z-20 w-full">
                <div
                  className={classNames(
                    'relative cursor-pointer !pb-1.5 !pt-4.5 text-start lg:!pb-3 lg:!pt-7',
                    { '!border-red-700': Boolean(errorMessage) },
                    baseClasses
                  )}
                >
                  {selectedCountry?.display_name}
                </div>

                <span
                  className={classNames(
                    'left-2.5 top-1 lg:left-4.5 lg:top-3',
                    { 'text-gray-200': disabled },
                    labelBaseClasses
                  )}
                >
                  Country
                </span>

                <Icon
                  name="chevron-down"
                  className="pointer-events-none absolute right-4 top-3 transition-all lg:top-5"
                />
              </div>
            </button>
          </Dropdown.Trigger>

          <Dropdown.Content
            className="dropdown-content relative"
            sideOffset={0}
            align="end"
          >
            {countries.map((country: Country) => {
              if (regionId) {
                if (regionId === country.region_id) {
                  return (
                    <Dropdown.Item
                      className="dropdown-item font-black italic text-primary"
                      onSelect={() => handleSelect && handleSelect(country)}
                      key={country.id}
                    >
                      {country.display_name}
                    </Dropdown.Item>
                  );
                }
              } else {
                return (
                  <Dropdown.Item
                    className="dropdown-item font-black italic text-primary"
                    onSelect={() => handleSelect && handleSelect(country)}
                    key={country.id}
                  >
                    {country.display_name}
                  </Dropdown.Item>
                );
              }
            })}
          </Dropdown.Content>
        </Dropdown.Root>

        {Boolean(errorMessage) && (
          <span className="pt-2 text-xs2 text-red-700">{errorMessage}</span>
        )}
      </div>
    );
};
