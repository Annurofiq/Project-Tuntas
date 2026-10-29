const argon2 = require('argon2');

/**
 * Hash password using Argon2id
 * @param {string} password 
 * @returns {Promise<string>}
 */
const hashPassword = async (password) => {
  try {
    return await argon2.hash(password, { type: argon2.argon2id });
  } catch (err) {
    throw new Error('Hashing failed');
  }
};

/**
 * Verify password against stored hash
 * @param {string} hash 
 * @param {string} password 
 * @returns {Promise<boolean>}
 */
const verifyPassword = async (hash, password) => {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    return false;
  }
};

module.exports = {
  hashPassword,
  verifyPassword
};
