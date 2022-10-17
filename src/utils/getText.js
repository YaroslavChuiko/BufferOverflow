const getText = (html) => html.replace(/<[^>]+>/g, '');

export default getText;