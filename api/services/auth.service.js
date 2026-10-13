const jwt = require('jsonwebtoken');
const users = require('../models/user');
const { AppError } = require('../utils/AppError');

const JWT_SECRET = process.env.JWT_SECRET || 'book-rent-dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

const toPublicUser = (user) => ({
  id: user.id,
  username: user.username,
});

const login = ({ username, password }) => {
  if (!username || !password) {
    throw new AppError('username and password are required', 400);
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token, user: toPublicUser(user) };
};

const getUserByToken = (token) => {
  if (!token) {
    return null;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = users.find((u) => u.id === payload.id);
    return user ? toPublicUser(user) : null;
  } catch {
    return null;
  }
};

module.exports = { login, getUserByToken };
