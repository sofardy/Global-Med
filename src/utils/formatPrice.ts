export const formatPrice = (priceString: string): string => {
  // Extract numbers from the string
  const numbers = priceString.match(/\d+/g);
  if (!numbers) return priceString;

  // Format each number with thousands separators
  const formattedNumbers = numbers.map((num) => {
    return parseInt(num).toLocaleString("ru-RU");
  });

  // Replace original numbers with formatted ones
  let result = priceString;
  numbers.forEach((num, index) => {
    result = result.replace(num, formattedNumbers[index]);
  });

  return result;
};
