import * as React from 'react';
import { getProductsById, getRegion } from '@/lib/data';
import SingleProduct from '@/modules/product/components';
import Image from 'next/image';
import freshBag from '../../../../../public/images/content/item-fresh-bag-white.png';

export async function generateMetadata({
  params: { productSlug, countryCode },
}: {
  params: { productSlug: string; countryCode: string };
}) {
  const region = await getRegion(countryCode || '');
  const products = await getProductsById({
    ids: productSlug ? [productSlug] : [],
    regionId: region?.id || '',
  });
  return {
    title: products?.[0]?.title || 'Product',
  };
}

const ProductSinglePage = async ({
  params: { productSlug, countryCode },
}: {
  params: { productSlug: string; countryCode: string };
}) => {
  const region = await getRegion(countryCode || '');
  const products = await getProductsById({
    ids: productSlug ? [productSlug] : [],
    regionId: region?.id || '',
  });

  const product = products?.[0];
  const currencyCode = region?.currency_code;

  return (
    <main className="group flex grid-cols-12 flex-col-reverse px-4 py-8 sm:px-24 lg:grid lg:pb-36 lg:pl-0 lg:pt-15 xl:pl-24">
      <div className="col-span-6 mt-20 lg:mt-20">
        <ul className="[&>li:last-child]:mb-0 [&>li]:mb-8">
          {product?.images?.map((image) => {
            return (
              <li className="relative" key={image.id}>
                <Image
                  src={image.url || freshBag}
                  height={3200}
                  width={2400}
                  alt="White T-shirt"
                  className="peer relative z-10 aspect-[3/4] w-full"
                />

                <Image
                  src={image.url || freshBag}
                  height={3200}
                  width={2400}
                  alt="Background"
                  className="absolute left-0 top-0 h-full w-full"
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="col-span-6 lg:ml-27">
        {product && (
          <SingleProduct
            product={product}
            currency={currencyCode}
            countryCode={countryCode || ''}
          />
        )}
      </div>
    </main>
  );
};

export default ProductSinglePage;
