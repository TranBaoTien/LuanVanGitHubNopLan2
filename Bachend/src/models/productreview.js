'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productreview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Productreview.init({
    idoder: DataTypes.INTEGER,
    iduser: DataTypes.INTEGER,
    start: DataTypes.DOUBLE,
    cmt: DataTypes.TEXT,
    edit: DataTypes.BOOLEAN,
    idpro: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Productreview',
  });
  return Productreview;
};