const toNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

export const formatINR = (value, options = {}) => {
  const num = toNumber(value);

  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(num);
};

export const abbreviateINR = (
  value,
  decimals = 1,
  space = false
) => {
  const num = toNumber(value);

  const sign = num < 0 ? "-" : "";
  const abs = Math.abs(num);
  const spacer = space ? " " : "";

  const format = (val, suffix) =>
    `${sign}₹${spacer}${val.toFixed(decimals)}${suffix}`;

  if (abs >= 10000000) {
    return format(abs / 10000000, "Cr"); // Crores
  }

  if (abs >= 100000) {
    return format(abs / 100000, "L"); // Lakhs
  }

  if (abs >= 1000) {
    return format(abs / 1000, "K"); // Thousands
  }

  return `${sign}₹${spacer}${abs.toFixed(0)}`;
};