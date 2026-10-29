const crypto = require('crypto');

/**
 * Generate a secure random token
 * @returns {string} Hex encoded token
 */
const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Hash a token using SHA-256 for secure database storage
 * @param {string} token 
 * @returns {string} Hashed token
 */
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

module.exports = {
  generateToken,
  hashToken
};
