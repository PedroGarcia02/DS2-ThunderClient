const { Sequelize } = require('sequelize');

const sequelizeCon = new Sequelize('postgres://yrjxgcjmrxavgk:b36e266b35ce6eddf9efe60025d5b56dc602350fba19165fcea14ffc93dd323e@ec2-107-23-76-12.compute-1.amazonaws.com:5432/djdfa1p8l36qt', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

sequelizeCon
  .authenticate()
  .then(() => {
    console.log('Conexão Estabelecida.');
  })
  .catch(err => {
    console.log('Erro ao estabelecer conexão:', err);
});

module.exports = { sequelizeCon };