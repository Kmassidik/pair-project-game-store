'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.changeColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.changeColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
