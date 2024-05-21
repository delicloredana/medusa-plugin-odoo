const currencies = [
  {
    currency_code: 'eur',
    symbol: '€',
  },
  {
    currency_code: 'usd',
    symbol: '$',
  },
];
export const getCurrency = (currencyCode: string | undefined) => {
  if (currencyCode) {
    const currency = currencies.find(
      (curr) => curr.currency_code === currencyCode
    );
    return currency?.symbol || '';
  }
  return '';
};
