var request = require('request');

// Primeira requisição para obter o token
var optionsToken = {
  'method': 'POST',
  'url': 'https://rhid.com.br/v2/login.svc/',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "email": "",
    "password": ""
  })
};

request(optionsToken, function (error, response) {
  if (error) throw new Error(error);

  const token = JSON.parse(response.body).accessToken;

  // Segunda requisição para enviar informações do funcionário usando o token obtido
  var optionsEmployee = {
    'method': 'PUT',
    'url': 'https://www.rhid.com.br/v2/customerdb/person.svc/a',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token // Corrigindo o cabeçalho de autorização
    },
    body: JSON.stringify({
      "status": 1,
      "id": 327,
      "dateShiftsStartStr": "20220322",
      "newIdShift": 1,
      "idCompany": 1,
      "name": "",
      "pis": "",
      "cpf": "",
      "admissionDateStr": "2024-02-19T03:00:00.000Z",
      "numFolha": "999"
    })
  };

  // Executa a segunda requisição
  request(optionsEmployee, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
});

