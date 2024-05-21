import * as React from 'react';

import { Heading } from '@/modules/common/ui/Heading';

const TermsOfUsePage= () => {
  return (
    <main className="grid grid-cols-12 px-4 py-10 lg:px-24 lg:pb-50 lg:pt-26">
      <span className="col-span-1 hidden lg:block xl:col-span-2" />

      <div className="col-span-12 lg:col-span-8 xl:col-span-6">
        <Heading className="mb-25 !leading-[1.1]" size="xl4">
          Terms of Use for Red
        </Heading>

        <p className="mb-15">
          Welcome to Red Fashion Brand (&quot;Red,&quot; &quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;). These Terms of Use govern your
          access to and use of our website, products, and services. By accessing
          or using our platform, you agree to be bound by these terms and
          conditions. If you do not agree with any part of these terms, please
          do not use our website.
        </p>

        <ul className="list-inside list-decimal marker:inline marker:text-lg marker:font-black [&>li:last-child]:mb-0 [&>li]:mb-15 [&>li]:whitespace-nowrap">
          <li>
            <Heading className="inline whitespace-normal" size="lg">
              What Are Cookies:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p>
                All content and materials on our website, including text,
                graphics, logos, images, videos, and trademarks, are the
                property of Red or its licensors and are protected by
                intellectual property laws. You may not use, reproduce, modify,
                or distribute any of our content without our prior written
                permission.
              </p>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Use of the Website:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p className="mb-4">
                a. Eligibility: You must be at least 16 years old to use our
                website. If you are under the age of 18, you should review these
                terms with a parent or guardian to ensure their understanding
                and agreement.
              </p>

              <p className="mb-4">
                b. User Account: Some features of our website may require you to
                create an account. You are responsible for maintaining the
                confidentiality of your account credentials and are solely
                responsible for any activity that occurs under your account.
              </p>

              <p className="mb-4">
                c. Prohibited Activities: You agree not to engage in any of the
                following activities:
              </p>

              <ul className="ml-6 list-disc">
                <li>Violating any applicable laws or regulations.</li>
                <li>
                  Impersonating any person or entity or falsely representing
                  your affiliation with any person or entity.
                </li>
                <li>
                  Interfering with or disrupting the functionality of our
                  website or servers.
                </li>
                <li>
                  Uploading or transmitting any viruses, malware, or other
                  malicious code.
                </li>
                <li>
                  Collecting or harvesting any information from our website
                  without our consent.
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Third-Party Links and Content:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p>
                Our website may contain links to third-party websites or display
                content from third parties. We do not endorse or control these
                third-party websites or content, and your use of them is at your
                own risk. We are not responsible for the accuracy, reliability,
                or legality of any third-party websites or content.
              </p>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Disclaimer of Warranties:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p>
                Our website is provided on an &quot;as is&quot; and &quot;as
                available&quot; basis. We do not make any warranties, express or
                implied, regarding the operation, availability, or accuracy of
                our website or the content therein. Your use of our website is
                at your sole risk.
              </p>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Limitation of Liability:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p>
                To the maximum extent permitted by law, Red and its affiliates,
                officers, directors, employees, and agents shall not be liable
                for any direct, indirect, incidental, consequential, or special
                damages arising out of or in connection with your use of our
                website, even if advised of the possibility of such damages.
              </p>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Indemnification:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p>
                You agree to indemnify, defend, and hold harmless Red and its
                affiliates, officers, directors, employees, and agents from and
                against any claims, liabilities, damages, losses, and expenses,
                including reasonable attorney&apos;s fees, arising out of or in
                connection with your use of our website or violation of these
                Terms of Use.
              </p>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Modifications to the Terms:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p>
                We may update or modify these Terms of Use at any time without
                prior notice. Any changes will be effective immediately upon
                posting on our website. Your continued use of our website after
                the changes constitutes your acceptance of the modified terms.
              </p>
            </div>
          </li>

          <li>
            <Heading className="inline whitespace-normal" size="lg">
              Governing Law and Jurisdiction:
            </Heading>

            <div className="mt-7 whitespace-normal">
              <p>
                These Terms of Use shall be governed by and construed in
                accordance with the laws of [Jurisdiction]. Any disputes arising
                out of or in connection with these terms shall be subject to the
                exclusive jurisdiction of the courts of [Jurisdiction].
              </p>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
};


export default TermsOfUsePage;
