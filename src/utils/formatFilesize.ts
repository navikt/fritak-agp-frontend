export const formatFilesize = (max: number): string => {
  if (max < 1000000) {
    // Kb
    return (max / 1000).toFixed(0) + ' KB';
  }
  return (max / (1000 * 1000)).toFixed(1) + ' MB';
};
