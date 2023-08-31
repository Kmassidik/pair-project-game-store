"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn("Reviews", "UserId", {
      type: Sequelize.INTEGER,
      references: { model: "Users", key: "id" },
    });

    // Menambahkan FK ke tabel Users
    return queryInterface.addColumn("Reviews", "ProductId", {
      type: Sequelize.INTEGER,
      references: { model: "Products", key: "id" },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn("Reviews", "ProductId");

    // Menghapus FK dari tabel Products
    return queryInterface.removeColumn("Reviews", "UserId");
  },
};
