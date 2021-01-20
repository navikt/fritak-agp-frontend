export const formatFilesize = (max: number): string => {
  if (max < 1000 * 1024) {
    return (max / 1024).toFixed(0) + ' KB';
  }
  return (max / (1000 * 1024)).toFixed(1) + ' MB';
};
