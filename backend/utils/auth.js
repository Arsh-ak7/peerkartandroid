const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../secrets');

module.exports = context => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new Error('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token invalid must be 'Bearer [token]' ");
  }
  throw new Error('Authorization header must be provided');
};
