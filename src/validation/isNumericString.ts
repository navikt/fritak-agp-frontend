const isNumericString = (probableNumber: string | undefined) => {
  if (probableNumber === undefined) {
    return false;
  }

  return /^[0-9]{1,20}([,.][0-9]{1,2})?$/.test(probableNumber);
};

export default isNumericString;
