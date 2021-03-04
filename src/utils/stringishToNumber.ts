const stringishToNumber = (source: string | undefined): number | undefined => {
  return source !== undefined && source !== '' ? Number(source.replace(',', '.')) : undefined;
};

export default stringishToNumber;
