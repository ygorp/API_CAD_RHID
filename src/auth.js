var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://rhid.com.br/v2/login.svc/',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "email": "ygor@bmvix.com.br",
    "password": "159753"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  const token = response.body;
  console.log(token);
});

exports.token = function (req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado' });
  }
  next();
};