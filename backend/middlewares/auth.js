const jwt = require('jsonwebtoken');

const SECRET_KEY = '0ee546d67f1c3e5d2a38aabd57961002b1bd821f67729ee34820aa2c3076e7d5';
const UnAutorizedError = require('../errors/UnAutorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnAutorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnAutorizedError('Необходима авторизация');
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
