export const calculatePlatformFee = (price) => {
  const feePercent = parseFloat(process.env.PLATFORM_FEE_PERCENT || 7);
  const priceNum = parseFloat(price);
  return (priceNum * feePercent) / 100;
};

export const calculateSellerEarnings = (price) => {
  const priceNum = parseFloat(price);
  const fee = calculatePlatformFee(priceNum);
  return priceNum - fee;
};

export const getFeePercent = () => {
  return parseFloat(process.env.PLATFORM_FEE_PERCENT || 7);
};
