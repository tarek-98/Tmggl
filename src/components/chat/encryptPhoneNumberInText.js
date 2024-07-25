export const encryptPhoneNumberInText = (text) => {
  const phoneRegex = /\b\d{10,}\b/g; // Regular expression to match numbers with 10 or more digits
  return text.replace(phoneRegex, (match) => {
    const visibleDigits = 4;
    const stars = "*".repeat(match.length - visibleDigits);
    const visiblePart = match.slice(-visibleDigits);
    return `${stars}${visiblePart}`;
  });
};
