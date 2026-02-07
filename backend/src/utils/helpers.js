export const calculatePlatformFee = (price) => {
  const feePercent = parseFloat(process.env.PLATFORM_FEE_PERCENT || 7);
  return (parseFloat(price) * feePercent) / 100;
};

export const calculateSellerEarnings = (price) => {
  const fee = calculatePlatformFee(price);
  return parseFloat(price) - fee;
};

export const formatMoney = (amount) => {
  return parseFloat(amount).toFixed(2);
};

export const validatePrice = (price) => {
  const numPrice = parseFloat(price);
  return !isNaN(numPrice) && numPrice > 0;
};
