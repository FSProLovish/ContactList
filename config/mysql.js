const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'hapi_pal'
});

connection.connect((err) => {
  if(!err) {
    console.log('connected');
  }else {
    console.log('connection failed');
  }
});

module.exports = connection;