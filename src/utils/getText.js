// delete tags, &nbsp; &lt; ..., \n
const getText = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\&[a-z]+;|\n/g, ' '); 

export default getText;