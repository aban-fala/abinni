export const convertDateToDateString = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${month}/${day}/${year}`;
  } catch (e) {
    return "Invalid";
  }
};
