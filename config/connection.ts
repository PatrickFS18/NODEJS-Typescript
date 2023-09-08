import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('personagens', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export {
  Sequelize,  
  sequelize   
};
