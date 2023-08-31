"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Transaction);
      Product.belongsTo(models.Review);
    }
  }
  Product.init(
    {
      nameProduct: DataTypes.STRING,
      price: DataTypes.INTEGER,
      about: DataTypes.TEXT,
      image: DataTypes.TEXT,
      StoreId: DataTypes.INTEGER,
      TransactionId: DataTypes.INTEGER,
      ReviewId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};