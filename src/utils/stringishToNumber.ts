const stringishToNumber = (source: string | undefined): number | undefined => {
  return source !== undefined && typeof source === 'string' && source.trim() !== ''
    ? Number(source.replace(',', '.').replace(/\s/g, ''))
    : undefined;
};

export default stringishToNumber;
