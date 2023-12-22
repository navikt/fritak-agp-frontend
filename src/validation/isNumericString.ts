const isNumericString = (probableNumber: string | undefined) => {
  if (probableNumber === undefined) {
    return false;
  }

  return /^\d{1,20}([,.]\d{1,2})?$/.test(probableNumber);
};

export default isNumericString;
