const fs = require('fs');
const csv = require('csv-parser');
const request = require('request');

// Função para realizar a requisição com as informações de um funcionário
function sendEmployeeData(employeeData, token) {
  const optionsEmployee = {
    'method': 'POST',
    'url': 'https://www.rhid.com.br/v2/customerdb/person.svc/a',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(employeeData)
  };

  // Realiza a requisição para enviar os dados do funcionário
  request(optionsEmployee, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}

// Realiza a leitura do arquivo CSV
fs.createReadStream('funcionarios.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Para cada linha no arquivo CSV, envia os dados do funcionário
    requestToken(function(token) {
      sendEmployeeData(row, token);
    });
  })
  .on('end', () => {
    console.log('Leitura do arquivo CSV concluída.');
  });

// Função para realizar a requisição e obter o token
function requestToken(callback) {
  const optionsToken = {
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

  // Realiza a requisição para obter o token
  request(optionsToken, function (error, response) {
    if (error) throw new Error(error);

    const token = JSON.parse(response.body).accessToken;
    callback(token);
  });
}
