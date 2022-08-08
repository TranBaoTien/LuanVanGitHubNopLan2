'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Typeproduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Typeproduct.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Typeproduct',
  });
  return Typeproduct;
};