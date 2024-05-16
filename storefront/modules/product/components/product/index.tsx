import Link, { LinkProps } from 'next/link';
import Image, { StaticImageData } from 'next/image';
import classNames from '@/utils/classNames';
import { Tag } from '@/modules/common/ui/Tag';
import { getCurrency } from '@/utils/prices';
import freshBg from '../../../../public/images/content/fresh-bg.png';
import matzBg from '../../../../public/images/content/matz-bg.png';
import baseBg from '../../../../public/images/content/base-bg.png';

export interface ProductProps {
  className?: string;
  price: number;
  discount?: number;
  discountedPrice?: number;
  title: string;
  src: StaticImageData | string;
  height: number;
  width: number;
  alt: string;
  linkTo: LinkProps['href'];
  collection: string;
  currencyCode: string | undefined;
}

export const Product: React.FC<ProductProps> = ({
  className,
  price,
  discount,
  discountedPrice,
  title,
  src,
  height,
  width,
  alt,
  linkTo,
  collection,
  currencyCode,
}) => {
  if (discount && !discountedPrice) {
    throw new Error('discountedPrice is required when using discount');
  } else if (discountedPrice && !discount) {
    throw new Error('discount is required when using discountedPrice');
  }

  return (
    <Link href={linkTo} className={classNames('group block', className)}>
      <div className="relative">
        <Image
          src={src}
          height={height}
          width={width}
          alt={alt}
          className="relative z-10 mb-6 w-full"
        />

        {collection === 'fresh' ? (
          <Image
            src={freshBg}
            height={height}
            width={width}
            alt="Background"
            className="invisible absolute left-0 top-0 h-full w-full opacity-0 transition-all group-hover:visible group-hover:opacity-100"
          />
        ) : collection === 'matz' ? (
          <Image
            src={matzBg}
            height={height}
            width={width}
            alt="Background"
            className="invisible absolute left-0 top-0 h-full w-full opacity-0 transition-all group-hover:visible group-hover:opacity-100"
          />
        ) : (
          collection === 'base' && (
            <Image
              src={baseBg}
              height={height}
              width={width}
              alt="Background"
              className="invisible absolute left-0 top-0 h-full w-full opacity-0 transition-all group-hover:visible group-hover:opacity-100"
            />
          )
        )}

        {discount && (
          <Tag
            variant="discount"
            className="pointer-events-none absolute bottom-2 right-1.5 z-10"
          >
            {discount}%
          </Tag>
        )}
      </div>

      <div className="mb-4 flex justify-between text-sm">
        <span>{title}</span>

        <ul className="relative">
          <li className={classNames({ 'text-red-700': discount })}>
            {getCurrency(currencyCode)}
            {(price / 100).toFixed(2)}
          </li>
          {discount && (
            <li className="absolute -bottom-6 right-0 text-xs text-gray-400 line-through">
              {getCurrency(currencyCode)}
              {(discountedPrice! / 100).toFixed(2)}
            </li>
          )}
        </ul>
      </div>

      <ul
        className={classNames(
          'invisible flex h-4 opacity-0 transition-all group-hover:visible group-hover:opacity-100 [&>li:last-child]:mr-0 [&>li]:mr-2',
          {
            'w-1/10': discount,
          }
        )}
      >
        <li>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 44 16"
              width="44"
              fill="none"
            >
              <g fill="#050505" clipPath="url(#a)">
                <path d="M27.223 16H14.795L17.703.049H30.13l-.978 5.317H23.26l-.103.467h5.919l-.772 4.185H22.41l-.103.492h5.893L27.223 16ZM30.747.049h6.82c4.81 0 6.895 2.24 6.097 6.621l-.566 3.077c-.257 1.403-.643 2.536-1.209 3.496C40.809 15.089 38.904 16 35.43 16h-7.59L30.747.049Zm5.739 5.12-.978 5.514h.025c.49 0 .644-.123.798-1.01l.643-3.569c.155-.787.103-.935-.437-.935h-.051ZM16.494 3.15c-.18-1.083-.798-1.92-1.982-2.461-.514-.246-1.157-.419-1.93-.517a15.203 15.203 0 0 0-1.93-.123H3.038L.129 15.999h6.69l.875-4.75c.412 0 .566.05.489.714-.026.098-.026.221-.052.369l-.489 2.61L7.462 16h6.69l.155-.813.54-2.904.052-.222c.386-2.117.102-3.028-1.673-3.397 1.132-.246 2.007-.738 2.599-1.723a5.633 5.633 0 0 0 .643-1.846c.103-.714.129-1.378.026-1.945ZM9.546 5.907c-.077.37-.205.616-.386.739a.632.632 0 0 1-.36.123h-.309l.31-1.674h.282c.155 0 .258.05.335.123.154.123.206.394.128.69Z" />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h44v16H0z" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </li>

        <li>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 44 16"
              width="44"
              fill="none"
            >
              <g fill="#1E2DA0" clipPath="url(#a)">
                <path d="M27.223 16H14.795L17.703.049H30.13l-.978 5.317H23.26l-.103.467h5.919l-.772 4.185H22.41l-.103.492h5.893L27.223 16ZM30.747.049h6.82c4.81 0 6.895 2.24 6.097 6.621l-.566 3.077c-.257 1.403-.643 2.536-1.209 3.496C40.809 15.089 38.904 16 35.43 16h-7.59L30.747.049Zm5.739 5.12-.978 5.514h.025c.49 0 .644-.123.798-1.01l.643-3.569c.155-.787.103-.935-.437-.935h-.051ZM16.494 3.15c-.18-1.083-.798-1.92-1.982-2.461-.514-.246-1.157-.419-1.93-.517a15.203 15.203 0 0 0-1.93-.123H3.038L.129 15.999h6.69l.875-4.75c.412 0 .566.05.489.714-.026.098-.026.221-.052.369l-.489 2.61L7.462 16h6.69l.155-.813.54-2.904.052-.222c.386-2.117.102-3.028-1.673-3.397 1.132-.246 2.007-.738 2.599-1.723a5.633 5.633 0 0 0 .643-1.846c.103-.714.129-1.378.026-1.945ZM9.546 5.907c-.077.37-.205.616-.386.739a.632.632 0 0 1-.36.123h-.309l.31-1.674h.282c.155 0 .258.05.335.123.154.123.206.394.128.69Z" />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h44v16H0z" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </li>
      </ul>
    </Link>
  );
};
