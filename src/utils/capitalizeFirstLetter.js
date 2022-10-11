const capitalizeFirstLetter = (string) => {
  switch (string.length) {
    case 0:
      return '';

    case 1:
      return string.toUpperCase();

    default:
      return string[0].toUpperCase() + string.slice(1);
  }
};

export default capitalizeFirstLetter;