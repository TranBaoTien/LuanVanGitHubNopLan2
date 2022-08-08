'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detailoder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Detailoder.init({
    quatity: DataTypes.INTEGER,
    namepro: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    idpro: DataTypes.INTEGER,
    idoder: DataTypes.INTEGER,
    summoney: DataTypes.DOUBLE,
    idbh: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detailoder',
  });
  return Detailoder;
};