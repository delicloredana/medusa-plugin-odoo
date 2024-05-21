import * as React from 'react';
import { Heading } from '@/modules/common/ui/Heading';

const PrivacyPolicyPage = () => {
  return (
    <main className="grid grid-cols-12 px-4 py-10 lg:px-24 lg:pb-50 lg:pt-26">
      <span className="col-span-1 hidden lg:block xl:col-span-2" />

      <div className="col-span-12 lg:col-span-8 xl:col-span-6 ">
        <Heading className="mb-26 !leading-[1.1]" size="xl4">
          Privacy Policy for Red
        </Heading>

        <p className="mb-15">
          At Red Fashion Brand (&quot;Red,&quot; &quot;we,&quot; &quot;us,&quot;
          or &quot;our&quot;), we value your privacy and are committed to
          protecting your personal information. This Privacy Policy outlines how
          we collect, use, disclose, and safeguard your data when you interact
          with our website, services, and products. By using our platform, you
          consent to the practices described in this policy.
        </p>

        <ul className="list-inside list-decimal marker:inline marker:text-lg marker:font-black marker:italic [&>li:last-child]:mb-0 [&>li]:mb-15 [&>li]:whitespace-nowrap">
          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Information We Collect:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p className="mb-4">
                We may collect personal information you provide directly to us,
                such as:
              </p>

              <ul className="mb-4 ml-6 list-disc marker:text-xs">
                <li>
                  Name, email address, and contact details when you sign up for
                  an account.
                </li>
                <li>
                  Billing and shipping addresses when you make a purchase.
                </li>
                <li>
                  Payment information (credit/debit card details) for completing
                  transactions securely.
                </li>
                <li>
                  Personal preferences and fashion interests you share with us.
                </li>
              </ul>

              <p className="mb-4">
                Additionally, we may automatically collect certain information
                when you access or use our website, including:
              </p>

              <ul className="ml-6 list-disc marker:text-xs">
                <li>
                  IP address, browser type, operating system, and device
                  information.
                </li>
                <li>
                  Usage data, such as pages visited, time spent on our platform,
                  and referring website.
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              How We Use Your Information:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p className="mb-4">
                We may use your personal information for various purposes,
                including but not limited to:
              </p>

              <ul className="ml-6 list-disc marker:text-xs">
                <li>
                  Providing and managing your account, purchases, and orders.
                </li>
                <li>
                  Customizing your shopping experience and suggesting relevant
                  products.
                </li>
                <li>
                  Sending you updates, newsletters, and marketing communications
                  (you can opt-out anytime).
                </li>
                <li>
                  Analyzing user behavior to improve our website and services.
                </li>
                <li>
                  Complying with legal obligations and enforcing our Terms of
                  Service.
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Cookies and Similar Technologies:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p>
                We use cookies and similar technologies to collect information
                about your browsing activity on our website. These technologies
                help us analyze usage patterns and enhance user experience. You
                can manage your cookie preferences through your browser
                settings.
              </p>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Data Sharing and Disclosure:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p className="mb-4">
                We may share your personal information with third parties under
                certain circumstances, including:
              </p>

              <ul className="mb-4 ml-6 list-disc marker:text-xs">
                <li>
                  Service providers who assist us in operating our business and
                  delivering services.
                </li>

                <li>
                  Legal authorities or government agencies as required by law.
                </li>
              </ul>

              <p>
                We do not sell or rent your personal information to third
                parties for their marketing purposes.
              </p>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Data Security:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p>
                We implement reasonable security measures to protect your
                personal information from unauthorized access, alteration, or
                disclosure. However, no method of transmission over the internet
                or electronic storage is completely secure.
              </p>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Your Choices:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p className="mb-4">You have the right to:</p>

              <ul className="mb-15 ml-6 list-disc marker:text-xs">
                <li>
                  Review and update your personal information in your account
                  settings.
                </li>
                <li>Opt-out of receiving marketing communications.</li>
                <li>
                  Delete your account (subject to applicable laws and
                  regulations).
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Children&apos;s Privacy:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p>
                Our services are not intended for individuals under the age of
                16. If we become aware that we have collected personal
                information from children without parental consent, we will take
                prompt action to delete such data.
              </p>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Changes to this Privacy Policy:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or for other operational, legal, or
                regulatory reasons. We will notify you of any material changes
                via email or by prominently posting a notice on our website.
              </p>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Contact Us:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p className="mb-4">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or how we handle your personal information,
                please contact us at:
              </p>

              <p>
                Email: privacy@red.com
                <br />
                Address: [Your Fashion Brand Address]
              </p>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
