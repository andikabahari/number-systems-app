export const isNumberValid = n => {
  if (isNaN(n) || typeof n !== "number") {
    return false;
  }

  return true;
};

export const convertDecimalToBinary = n => {
  if (isNumberValid(n)) {
    return n.toString(2);
  }

  return null;
};

export const convertDecimalToOctal = n => {
  if (isNumberValid(n)) {
    return n.toString(8);
  }

  return null;
};

export const convertDecimalToHex = n => {
  if (isNumberValid(n)) {
    return n.toString(16);
  }

  return null;
};

export const convertBinaryToDecimal = n => {
  let binary = n.toString().split("");

  for (let i = 0; i < n.toString().length; i++) {
    if (binary[i] < 0 || binary[i] > 1) {
      return null;
    }
  }

  return parseInt(binary.join(""), 2);
};

export const convertBinaryToOctal = n => {
  return convertDecimalToOctal(convertBinaryToDecimal(n));
};

export const convertBinaryToHex = n => {
  return convertDecimalToHex(convertBinaryToDecimal(n));
};

export const convertOctalToDecimal = n => {
  let octal = n.toString().split("");

  for (let i = 0; i < n.toString().length; i++) {
    if (octal[i] < 0 || octal[i] > 7) {
      return null;
    }
  }

  return parseInt(octal.join(""), 8);
};

export const convertOctalToBinary = n => {
  return convertDecimalToBinary(convertOctalToDecimal(n));
};

export const convertOctalToHex = n => {
  return convertDecimalToHex(convertOctalToDecimal(n));
};

export const convertHexToDecimal = n => {
  let hex = n.toString().split("");

  for (let i = 0; i < n.toString().length; i++) {
    if (hex[i] < 0 || hex[i] > 15) {
      return null;
    }
  }

  return parseInt(hex.join(""), 16);
};

export const convertHexToBinary = n => {
  return convertDecimalToBinary(convertHexToDecimal(n));
};

export const convertHexToOctal = n => {
  return convertDecimalToOctal(convertHexToDecimal(n));
};
