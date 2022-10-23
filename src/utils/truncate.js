const truncate = (text, newLength) => (text.length > newLength ? `${text.substring(0, newLength - 3)}...` : text);

export default truncate;
