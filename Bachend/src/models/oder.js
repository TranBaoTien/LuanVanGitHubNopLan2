'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Oder.init({
    address: DataTypes.STRING,
    iduser: DataTypes.INTEGER,
    note: DataTypes.TEXT,
    idpay: DataTypes.INTEGER,
    idvoucher: DataTypes.INTEGER,
    idstatus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Oder',
  });
  return Oder;
};