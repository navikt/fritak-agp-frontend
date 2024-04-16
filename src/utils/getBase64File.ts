function getBase64file(file: File) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default getBase64file;
