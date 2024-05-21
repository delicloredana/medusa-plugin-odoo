import * as React from 'react';
import { Heading } from '@/modules/common/ui/Heading';

const CookiePolicyPage = () => {
  return (
    <main className="grid grid-cols-12 px-4 py-10 lg:px-24 lg:pb-50 lg:pt-26">
      <span className="col-span-1 hidden lg:block xl:col-span-2" />

      <div className="col-span-12 lg:col-span-8 xl:col-span-6">
        <Heading className="mb-26 !leading-[1.1]" size="xl4">
          Cookie Policy for Red
        </Heading>

        <p className="mb-25">
          This Cookie Policy explains how Red Fashion Brand (&quot;Red,&quot;
          &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and
          similar technologies on our website. By using our website, you consent
          to the use of cookies as described in this policy.
        </p>

        <ul className="list-inside list-decimal marker:inline marker:text-lg marker:font-black marker:!italic [&>li:last-child]:mb-0 [&>li]:mb-15 [&>li]:whitespace-nowrap">
          <li>
            <Heading className="inline whitespace-normal" size="lg">
              What Are Cookies:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p>
                Cookies are small text files that are placed on your computer or
                device when you visit a website. They are widely used to make
                websites work more efficiently and provide a better browsing
                experience. Cookies also enable website owners to collect
                certain information about visitors.
              </p>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Types of Cookies We Use:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p className="mb-9">
                We use the following types of cookies on our website:
              </p>

              <ul className="ml-6 list-disc">
                <li>
                  <span className="font-bold">Essential Cookies:</span> These
                  cookies are necessary for the operation of our website and
                  enable you to navigate and use its features. They are
                  typically set in response to your actions, such as setting
                  your privacy preferences, logging in, or filling out forms.
                </li>
                <li>
                  <span className="font-bold">
                    Analytics and Performance Cookies:
                  </span>{' '}
                  These cookies help us understand how visitors interact with
                  our website by collecting information such as the number of
                  visitors, pages visited, and sources of traffic. This data
                  helps us improve our website&apos;s performance and usability.
                </li>
                <li>
                  <span className="font-bold">Functionality Cookies:</span>{' '}
                  These cookies allow our website to remember choices you make
                  (such as language preferences) and provide enhanced features.
                  They may also be used to provide personalized content based on
                  your browsing history.
                </li>
                <li>
                  <span className="font-bold">
                    Advertising and Targeting Cookies:
                  </span>{' '}
                  These cookies are used to deliver advertisements that are
                  relevant to your interests. They may also be used to limit the
                  number of times you see an advertisement and measure the
                  effectiveness of advertising campaigns.
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Third-Party Cookies:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p>
                We may allow third-party service providers, such as analytics
                and advertising companies, to place cookies on our website.
                These third parties may collect information about your online
                activities over time and across different websites.
              </p>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Cookie Management:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p className="mb-4">
                You can manage and control cookies through your browser
                settings. Most web browsers allow you to block or delete
                cookies. However, please note that blocking or deleting certain
                cookies may impact the functionality and user experience of our
                website.
              </p>

              <p>
                For more information on how to manage cookies, you can visit the
                help or settings section of your browser.
              </p>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Updates to the Cookie Policy:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p>
                We may update this Cookie Policy from time to time to reflect
                changes in our use of cookies or for other operational, legal,
                or regulatory reasons. We will notify you of any material
                changes by posting a prominent notice on our website.
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
                Cookie Policy or our use of cookies, please contact us at:
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



export default CookiePolicyPage;
