"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserDetail,{foreignKey:"UserId"})
      // User.hasMany(models.Transaction);
      // User.hasMany(models.Review);
    }

    static hashPassword(password) {
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds);
      return hash;
    }

    checkPassword(password) {
      let temp = bcrypt.compareSync(password, this.password);
      if (!temp) {
        throw "your password is wrong";
      }
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "username must be fill !!",
          },
          notNull: {
            msg: "username must be fill !!",
          },
          len: {
            args: [3, 20],
            msg: "Username must be between 3 and 20 characters.",
          },
          is: {
            args: /^[a-zA-Z0-9_-]+$/,
            msg: "Username can only contain letters, numbers, underscores, and hyphens.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password must not be empty.",
          },
          notNull: {
            msg: "Password must not be null.",
          },
          len: {
            args: [4, 20],
            msg: "Password must be between 4 and 20 characters.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email must not be empty.",
          },
          notNull: {
            msg: "Email must not be null.",
          },
          isEmail: {
            msg: "Invalid email format.",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, opt) => {
    user.role = "user";
    user.password = User.hashPassword(user.password);
  });

  User.afterCreate((user, opt) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Welcome to Game Store application',
      text: `Hello ${user.username}, welcome to our application!
      Hope you can buy all games in our store,
      and dont forget to give a review for the game you bought`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        throw new Error(`Error sending email: ${error}`);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });

  return User;
};
