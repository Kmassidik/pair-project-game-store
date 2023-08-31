'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserDetail.belongsTo(models.User,{foreignKey:"UserId"})
    }
  }
  UserDetail.init({
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    age: DataTypes.INTEGER,
    address: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserDetail',
  });

  UserDetail.beforeCreate((data, opt)=>{
    data.fname = ""
    data.lname = ""
    data.age = 0
    data.address = ""
  })
  
  return UserDetail;
};