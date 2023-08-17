function nFormatter(num, digits) {
  const lookup = [
    { value: 0, symbol: "" },
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item?.value;
    });
  return (num / item?.value).toFixed(digits).replace(rx, "$1") + item.symbol;
}

export const checkPricing = (prii) => {
  if (parseInt(prii) == 0) {
    return `Pricing not available`;
  } else {
    return `Starting from low $${nFormatter(prii, 2)}`;
  }
};
