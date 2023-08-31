"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    get formattedDate() {
      // return this.dateOfEvent.toISOString().slice(0, 10);
      return this.createdAt.toISOString().slice(0, 10);
    }
  }
  Transaction.init(
    {
      statusPayment: DataTypes.STRING,
      GameStoreId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
