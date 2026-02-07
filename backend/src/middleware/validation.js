export const validateRegister = (req, res, next) => {
  const { username, email, password, robloxUsername } = req.body;

  const errors = [];

  if (!username || username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push('Valid email is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!robloxUsername || robloxUsername.length < 3) {
    errors.push('Roblox username is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  next();
};

export const validateListing = (req, res, next) => {
  const { petName, petCategory, age, price, description } = req.body;

  const errors = [];

  if (!petName || petName.length < 2) {
    errors.push('Pet name is required (min 2 characters)');
  }

  if (!petCategory) {
    errors.push('Pet category is required');
  }

  if (!age) {
    errors.push('Pet age is required');
  }

  if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
    errors.push('Valid price is required (must be greater than 0)');
  }

  if (!description || description.length < 10) {
    errors.push('Description is required (min 10 characters)');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validateReview = (req, res, next) => {
  const { rating, comment } = req.body;

  const errors = [];

  if (!rating || rating < 1 || rating > 5) {
    errors.push('Rating must be between 1 and 5');
  }

  if (!comment || comment.length < 10) {
    errors.push('Comment is required (min 10 characters)');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
