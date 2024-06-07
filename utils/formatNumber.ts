export const formatCompactNumber = (number: number): string => {
    const suffixes = ["", "K", "M", "B", "T"];
    if (number < 5000) return number.toString(); // Less than five thousand
  
    const exponent = Math.floor(Math.log10(number) / 3);
    const formattedNumber = (number / Math.pow(1000, exponent)).toFixed(1).replace(/\.0$/, "");
  
    return formattedNumber + suffixes[exponent];
  };
  