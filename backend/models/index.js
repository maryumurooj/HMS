'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


// models/index.js
const User = require('./User');
const Patient = require('./Patient');

// Set up associations
User.hasOne(Patient, { 
  foreignKey: 'user_id', 
  as: 'patient' 
});

Patient.belongsTo(User, { 
  foreignKey: 'user_id', 
  as: 'user' 
});

// models/index.js
const Ward = require('./Ward');
const Department = require('./Department');
const Staff = require('./Staff');


// Associate Ward and Department with Users if necessary
Department.hasMany(User, { foreignKey: 'department_id' });
User.belongsTo(Department, { foreignKey: 'department_id' });

// If you plan to associate wards with departments
Department.hasMany(Ward, { foreignKey: 'department_id' });
Ward.belongsTo(Department, { foreignKey: 'department_id' });

Department.hasMany(Staff, { foreignKey: 'department_id' });
Staff.belongsTo(Department, { foreignKey: 'department_id' });

User.hasOne(Staff, { foreignKey: 'user_id' });
Staff.belongsTo(User, { foreignKey: 'user_id' });



module.exports = { Ward, Department, User, Staff };




db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log(db); // Add this after defining all associations in models/index.js


module.exports = db;
