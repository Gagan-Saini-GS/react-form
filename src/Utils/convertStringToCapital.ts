const convertString = (str: string) => {
  let newString: string = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      newString += str[i];
    }
  }

  return newString.charAt(0).toLowerCase() + newString.slice(1);
};

export default convertString;
