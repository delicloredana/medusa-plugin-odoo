import * as React from 'react';
import { Heading } from '@/modules/common/ui/Heading';
import aboutContent1 from '../../../../public/images/content/about-content-1.jpg';
import aboutContent2 from '../../../../public/images/content/about-content-2.png';
import aboutHero from "../../../../public/images/content/about-hero.jpg"

const AboutPage = () => {
  return (
    <>
      <div className="relative flex items-center justify-center">
        <img
          src={aboutHero.src}
          height={1151}
          width={1440}
          alt="Red logo shirt"
          className="absolute h-full w-full object-cover"
        />

        <div className="z-10 grid min-h-screen grid-cols-12 px-4 pb-26 pt-47 text-white lg:px-24">
          <div className="relative col-span-12 sm:col-span-8 xl:col-span-4">
            <div className="flex h-full flex-col justify-between">
              <div>
                <Heading className="mb-12" size="xl4">
                  The world of red
                </Heading>
                <div className="text-md [&>p]:mb-4">
                  <p>
                    Welcome to Red, where style meets substance. Red is not just
                    a street fashion brand; it&apos;s an attitude, a movement,
                    and a way of life. Our passion lies in creating cool,
                    youthful, and chill designs that resonate with the free
                    spirits of today.
                  </p>
                  <p>
                    But it doesn&apos;t stop there; Red is more than just a
                    brand; it&apos;s a philosophy that cherishes slow fashion
                    and sustainability. We are committed to producing fashion
                    with love and care, staying true to our core values of
                    environmental responsibility and ethical practices.
                  </p>
                </div>
              </div>

              <div className="text-md">
                <p>
                  Embrace the bold and step into the world of Red, where fashion
                  is not just an outfit but an expression of authenticity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="mb-14 grid-cols-12 px-4 pt-14 lg:mb-36 lg:grid lg:px-24 lg:pt-25">
        <Heading className="col-span-12 mb-16 text-primary" size="xl4">
          Breaking Boundaries
          <br /> Unisex Styles for All
        </Heading>

        <div className="col-span-6">
          <img
            src={aboutContent1.src}
            height={470}
            width={600}
            alt="Red bag"
            className="mb-10 w-full object-cover lg:mb-0"
          />
        </div>

        <span className="col-span-1" />

        <div className="relative col-span-4">
          <div className="text-md [&>p:last-child]:mb-0 [&>p]:mb-4">
            <p>
              At Red, we believe fashion should know no boundaries. Our designs
              break free from traditional gender norms, offering unisex styles
              that empower everyone to express themselves without limitations.
              Our collections are thoughtfully crafted, celebrating diversity
              and individuality. Whether you&apos;re rocking the city streets or
              dancing under the stars, our unisex streetwear is made to fit your
              vibe effortlessly.
            </p>

            <p className="tallWide:absolute tallWide:bottom-0">
              Red is more than just a brand; it&apos;s a community that embraces
              uniqueness, and we invite you to join us in celebrating fashion
              that knows no boundaries.
            </p>
          </div>
        </div>
      </main>

      <div className="grid-cols-12 pl-6 lg:grid lg:pl-24">
        <div className="relative col-span-4">
          <Heading
            className="col-span-12 mb-16 pr-6 text-primary lg:pr-0"
            size="xl4"
          >
            Slow Fashion
            <br /> Made with Love
          </Heading>

          <div className="pr-6 text-md lg:pr-0 [&>p:last-child]:mb-0 [&>p]:mb-4">
            <p>
              In a world of fast fashion, Red stands out as a beacon of
              conscious style. We are committed to breaking away from the
              relentless churn of trends and instead focus on producing timeless
              pieces that withstand the test of time.
            </p>

            <p>
              Each garment is carefully curated, from design conception to
              production, with love and care. We believe that fashion should not
              only make you look good but also make you feel good about your
              choices.
            </p>

            <p className="pb-30 tallWide:absolute tallWide:bottom-0">
              With Red, you can be confident that your fashion statement goes
              beyond aesthetics; it&apos;s a testament to your commitment to
              sustainability and the wellbeing of our planet. Embrace slow
              fashion, celebrate individuality, and discover the magic of Red
              streetwear.
            </p>
          </div>
        </div>

        <span className="col-span-1" />

        <div className="col-span-7">
          <img
            src={aboutContent2.src}
            height={982}
            width={883}
            alt="Red bag"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="-mt-12 bg-primary py-30">
        <div className="mx-auto max-w-2xl px-4 text-center lg:px-0">
          <Heading className="mb-12 text-white" size="xl4">
            Welcome to red
          </Heading>

          <p className="text-lg text-white">
            Where boldness meets passion, and style becomes your compass to
            self-expression. Join us, explore our collections, and be a part of
            our authentic fashion community.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
