const formatNumberForCurrency = (num: number): string => {
  return new Intl.NumberFormat('NO', {
    style: 'currency',
    useGrouping: true,
    minimumFractionDigits: 2,
    currency: 'NOK'
  }).format(num);
};

export default formatNumberForCurrency;
