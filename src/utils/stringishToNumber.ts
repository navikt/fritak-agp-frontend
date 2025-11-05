const stringishToNumber = (source: string | number | undefined): number | undefined => {
  if (typeof source === 'number') {
    return source;
  }
  return source !== undefined && typeof source === 'string' && source.trim() !== ''
    ? Number(source.replace(',', '.').replace(/\s/g, ''))
    : undefined;
};

export default stringishToNumber;
