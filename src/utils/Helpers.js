export const numberFormat = (num) => {
  return new Intl.NumberFormat("en-US").format(num);
};

export const dateFormat = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
