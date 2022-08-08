'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Receip.init({
    dateimport: DataTypes.DATE,
    iduser: DataTypes.INTEGER,
    idpro: DataTypes.INTEGER,
    namepro: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    summoney: DataTypes.DOUBLE,
    quatity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Receip',
  });
  return Receip;
};