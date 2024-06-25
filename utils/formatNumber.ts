export const formatCompactNumber = (number: number): string => {
  const suffixes = ["", "K", "M", "B", "T"];
  if (number < 5000000) return number.toLocaleString().replace(/,/g, ' '); // Less than five million

  const exponent = Math.floor(Math.log10(number) / 3);
  const formattedNumber = (number / Math.pow(1000, exponent)).toFixed(1).replace(/\.0$/, "");

  // Add spaces to the formatted number
  const parts = formattedNumber.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return parts.join(".") + suffixes[exponent];
};
