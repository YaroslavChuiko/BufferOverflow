export const validateLength = (html) => {
  const MIN_LENGTH = 30;
  const plainText = html.replace(/<[^>]+>/g, '');

  if (plainText.length < MIN_LENGTH) {
    return `Body must be at least ${MIN_LENGTH} characters; you entered ${plainText.length}.`;
  }

  return '';
};
