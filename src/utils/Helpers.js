export const numberFormat = (num) => {
  return new Intl.NumberFormat("en-US").format(num);
};

export const dateFormat = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
