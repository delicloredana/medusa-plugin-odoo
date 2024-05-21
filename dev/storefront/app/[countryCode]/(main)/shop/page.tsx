import * as React from 'react';
import { Heading } from '@/modules/common/ui/Heading';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { getProductsList, getRegion } from '@/lib/data';
import { Product } from '@/modules/product/components/product';
import freshBag from '../../../../public/images/content/item-fresh-bag-white.png';

const ShopPage = async ({
  params: { countryCode },
}: {
  params: { countryCode: string };
}) => {
  const {
    response: { products },
  } = await getProductsList({ countryCode: countryCode || '' });

  const region = await getRegion(countryCode);
  const currencyCode = region?.currency_code;
  if (products) {
    return (
      <>
        <main className="px-4 py-10 lg:px-24 lg:pb-39.5 lg:pt-17">
          <div className="relative mb-10 flex items-center justify-between lg:mb-19">
            <Heading size="xl6" className="text-primary">
              Shop
            </Heading>
          </div>

          <div className="grid grid-cols-12 gap-y-10 md:gap-x-12">
            {(products || []).map((product: PricedProduct) => (
              <Product
                className="col-span-12 md:col-span-6 lg:col-span-3"
                title={product.title ? product.title : ''}
                price={product.variants[0]?.calculated_price || 0}
                collection={product.collection?.handle || ''}
                src={product.thumbnail || product.images?.[0].url || freshBag}
                height={3200}
                width={2400}
                alt={product.title || ''}
                linkTo={`/${countryCode}/product/${product.id}`}
                key={product.id}
                discount={
                  product.variants[0]?.original_price! >
                  product.variants[0]?.calculated_price!
                    ? Number(
                        (
                          ((product.variants[0]?.original_price! -
                            product.variants[0]?.calculated_price!) /
                            product.variants[0]?.original_price!) *
                          100
                        ).toFixed(2)
                      )
                    : undefined
                }
                discountedPrice={
                  product.variants[0]?.original_price! >
                  product.variants[0]?.calculated_price!
                    ? product.variants[0]?.original_price!
                    : undefined
                }
                currencyCode={currencyCode}
              />
            ))}
          </div>
        </main>
      </>
    );
  }
};

export default ShopPage;
