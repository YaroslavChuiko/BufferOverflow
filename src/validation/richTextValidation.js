import getText from "../utils/getText"

export const validateLength = (html) => {
  const MIN_LENGTH = 30;
  const plainTextLength = getText(html).length;

  if (plainTextLength < MIN_LENGTH) {
    return `Body must be at least ${MIN_LENGTH} characters; you entered ${plainTextLength}.`
  }

  return '';
}