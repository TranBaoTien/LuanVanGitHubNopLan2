'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BaoHanh extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BaoHanh.init({
    detail: DataTypes.TEXT,
    error: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'BaoHanh',
  });
  return BaoHanh;
};