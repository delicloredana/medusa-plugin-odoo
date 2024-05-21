import { Heading } from '@/modules/common/ui/Heading';
import { Icon } from '@/modules/common/ui/Icon';
import { getCustomer, listRegions } from '@/lib/data';
import CustomerAddress from '@/modules/account/components/customer-address';
import CustomerInfo from '@/modules/account/components/customer-info';

const MyAccountPage = async () => {
  let customer = await getCustomer();
  const regions = await listRegions();
  const countries = regions?.flatMap((region: any) => region.countries);

  return true ? (
    <div>
      <Heading size="xl" className="mb-8 text-primary lg:mb-15">
        Personal & security
      </Heading>
      <ul className="[&>li:last-child]:mb-0 [&>li]:mb-16">
        <li>
          <p className="mb-6 text-md">Personal information</p>
          <div className="flex flex-wrap justify-between gap-8 rounded-sm border border-gray-200 p-4">
            <Icon name="user" />
            <div className="flex flex-1 flex-wrap gap-8">
              <ul className="flex-1">
                <li className="mb-0.5 text-xs2 text-gray-400">Name</li>
                <li className="text-sm text-black">
                  {customer?.first_name} {customer?.last_name}
                </li>
              </ul>
              <ul className="flex-1">
                <li className="mb-0.5 text-xs2 text-gray-400">Number</li>
                <li className="break-all text-sm text-black">
                  {customer?.phone || '-'}
                </li>
              </ul>
            </div>
            <CustomerInfo customer={customer} />
          </div>
        </li>
        <li>
          <p className="mb-6 text-md">Contact</p>
          <div className="mb-2 flex rounded-sm border border-gray-200 p-4">
            <Icon name="user" className="shrink-0" />
            <ul className="ml-8">
              <li className="mb-0.5 text-xs2 text-gray-400">Email</li>
              <li className="break-all text-sm text-black">
                {customer?.email}
              </li>
            </ul>
          </div>
          <p className="text-xs2 text-gray-400">
            If you want to change your email please contact us via customer
            support.
          </p>
        </li>
        <CustomerAddress customer={customer} countries={countries} />
        <li>
          <p className="mb-6 text-md">Change password</p>
          <p className="mb-12 text-gray-500">
            Perhaps you&apos;ve scribbled your password on a scrap of paper or
            you&apos;re the type who likes to change it every now and then to
            feel safer. Or maybe you had a rough weekend, and well, we know what
            can happen on weekends ( ͡° ͜ʖ ͡°). No worries, to change your
            password, we&apos;ll send you an email. Just click on the reset
            button below.
          </p>
        </li>
      </ul>
    </div>
  ) : (
    <p>Not logged in</p>
  );
};
export default MyAccountPage;
