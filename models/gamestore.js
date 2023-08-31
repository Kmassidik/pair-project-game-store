"use strict";
const { Model } = require("sequelize");
const qrcode = require('qrcode');

module.exports = (sequelize, DataTypes) => {
  class GameStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GameStore.hasMany(models.Invoice)
      GameStore.hasMany(models.Review, { foreignKey: "GameStoreId" })
    }

    generateQRCode(callback) {
      const url = `http://localhost:3000/gamestore/${this.id}`; // Replace with the actual route
      qrcode.toDataURL(url, (error, qrCodeImage) => {
        if (error) {
          console.error("Error generating QR code:", error);
          callback(error, null);
        } else {
          callback(null, qrCodeImage);
        }
      });
    }
    
  }
  GameStore.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "GameStore",
    }
  );
  return GameStore;
};
