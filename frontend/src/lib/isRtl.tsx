//check if the given text is rtl or ltr
const isRTL = (text: string | undefined) => {
  const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;

  if (text) {
    if (rtlChars.test(text)) {
      return "rtl";
    } else {
      return "ltr";
    }
  } else {
    return "rtl";
  }
};

export default isRTL;
