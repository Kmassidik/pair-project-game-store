'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User)
      Review.belongsTo(models.GameStore,{foreignKey:"GameStoreId"})
    }
  }
  Review.init({
    comments: DataTypes.STRING,
    UserId:DataTypes.INTEGER,
    GameStoreId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};