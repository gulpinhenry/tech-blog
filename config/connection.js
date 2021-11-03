const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

//mysql://opbvyrk4pwkct0fv:sva653629fria0re@frwahxxknm9kwy6c.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/eluw4yvx8052ceiw
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
