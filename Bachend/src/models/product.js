'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: DataTypes.STRING,
    xuatxu: DataTypes.STRING,
    timebaohanh: DataTypes.STRING,
    size: DataTypes.STRING,
    weigth: DataTypes.STRING,
    chatlieu:DataTypes.STRING,
    chip: DataTypes.TEXT,
    sonhan: DataTypes.STRING,
    ram: DataTypes.STRING,
    sizescreen: DataTypes.STRING,
    technologyscreen: DataTypes.STRING,
    dophangiai: DataTypes.STRING,
    camsau: DataTypes.STRING,
    camtruoc: DataTypes.STRING,
    musim: DataTypes.STRING,
    congsac: DataTypes.STRING,
    pin: DataTypes.STRING,
    hedieuhanh: DataTypes.STRING,
    img: DataTypes.STRING,
    idth: DataTypes.INTEGER,
    idtype: DataTypes.INTEGER,
    idstatus: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Product',
    indexes: [
      // add a FULLTEXT index
      { type: 'FULLTEXT', name: 'text_idx', fields: ['name','ram','technologyscreen','congsac','chip','hedieuhanh'] }
    ]
  });
  return Product;
};