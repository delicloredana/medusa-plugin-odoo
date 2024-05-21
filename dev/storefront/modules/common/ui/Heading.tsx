import classNames from '@/utils/classNames';

export interface HeadingProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?:
    | 'xl10'
    | 'xl9'
    | 'xl8'
    | 'xl7'
    | 'xl6'
    | 'xl5'
    | 'xl4'
    | 'xl3'
    | 'xl2'
    | 'xl'
    | 'lg'
    | 'md';
}

export const Heading: React.FC<HeadingProps> = ({
  as = 'h1',
  size = 'xl',
  children,
  className,
  ...rest
}) => {
  const As = as;

  return (
    <As
      className={classNames(
        'font-black italic',
        {
          'text-xl10': size === 'xl10',
          'text-xl9': size === 'xl9',
          '!text-xl2 sm:!text-xl4 md:!text-xl6 lg:!text-xl8': size === 'xl8',
          'text-xl7': size === 'xl7',
          '!text-xl2 sm:!text-xl4 md:!text-xl5 lg:!text-xl6': size === 'xl6',
          'text-xl5': size === 'xl5',
          'text-xl md:text-xl2 lg:text-xl4': size === 'xl4',
          'text-xl md:text-xl2 lg:text-xl3': size === 'xl3',
          'text-xl2': size === 'xl2',
          'text-lg lg:text-xl': size === 'xl',
          'text-lg': size === 'lg',
          'text-md': size === 'md',
        },
        className
      )}
      {...rest}
    >
      {children}
    </As>
  );
};
