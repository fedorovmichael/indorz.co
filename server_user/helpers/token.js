const jwt = require('jsonwebtoken');
const config = require('../config');

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;        
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

const createToken = (userName) =>{
  let token = jwt.sign({username: userName}, config.secret, {expiresIn: '24h'})
  return token
}

module.exports = {
  checkToken: checkToken,
  createToken: createToken
}