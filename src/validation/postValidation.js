import getText from "../utils/getText";

export const validateTitle = (title) => {
  const MIN_LENGTH = 15;
  const MAX_LENGTH = 150;
  if (!title.length) return `Title is missing`;
  if (title.length < MIN_LENGTH) return `Title must be at least ${MIN_LENGTH} characters.`;
  if (title.length > MAX_LENGTH) return `Title cannot be longer than ${MAX_LENGTH} characters.`;

  return '';
}

export const validateBody = (body) => {
  const MIN_LENGTH = 30;
  // const MAX_LENGTH = 150;
  const plainText = getText(body);

  if (!plainText.length) return `Body is missing.`;
  if (plainText.length < MIN_LENGTH) return `Body must be at least ${MIN_LENGTH} characters; you entered ${plainText.length}.`
  // if (login.length > MAX_LENGTH) return `Title cannot be longer than ${MAX_LENGTH} characters.`;


  return '';
}

export const validateTags = (tags) => {
  const MAX_LENGTH = 5;
  if (!tags.length) return `Please enter at least one tag.`;
  if (tags.length > MAX_LENGTH) return `Please enter no more than ${MAX_LENGTH} tags.`;
  
  return '';
}

export const validatePostData = (title, body, tags) => {
  const result = {
    success: true,
    title: validateTitle(title),
    body: validateBody(body),
    tags: validateTags(tags),
  }

  if (result.title || result.body || result.tags) {
    result.success = false;
  }

  return result;
}