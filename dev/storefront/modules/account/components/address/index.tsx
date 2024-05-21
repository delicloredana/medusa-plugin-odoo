import { Icon } from '@/modules/common/ui/Icon';
import { Address, Country } from '@medusajs/medusa';

export const SingleAddress = ({
  address,
  countries,
}: {
  address: Address;
  countries: Country[];
}) => {
  return (
    <>
      <Icon name="user" className="shrink-0" />
      <div className="mr-auto flex-1 self-start">
        <div className="mb-8 flex gap-8">
          <ul className="flex-1">
            <li className="mb-0.5 text-xs2 text-gray-400">Country</li>
            <li className="text-sm text-black">
              {
                countries.find(
                  (country) => country.iso_2 === address.country_code
                )?.display_name
              }
            </li>
          </ul>

          <ul className="flex-1">
            <li className="mb-0.5 text-xs2 text-gray-400">Address</li>
            <li className="text-sm text-black">{address.address_1}</li>
          </ul>
        </div>
        <ul className="mb-8 flex-1 gap-4">
          <li className="mb-0.5 text-xs2 text-gray-400">
            Apartment, suite, etc. (Optional)
          </li>
          <li className="text-sm text-black">Kat 2</li>
        </ul>
        <div className="flex gap-8">
          <ul className="flex-1">
            <li className="mb-0.5 text-xs2 text-gray-400">Postal Code</li>
            <li className="text-sm text-black">{address.postal_code}</li>
          </ul>

          <ul className="flex-1">
            <li className="mb-0.5 text-xs2 text-gray-400">City</li>
            <li className="text-sm text-black">{address.city}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SingleAddress;
