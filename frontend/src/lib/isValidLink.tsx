const isValidLink = (url: string) => {
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  if (url) {
    return regex.test(url);
  } else {
    return true;
  }
};

export default isValidLink;
