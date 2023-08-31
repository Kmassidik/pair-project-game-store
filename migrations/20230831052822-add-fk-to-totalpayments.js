"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn("Transactions", "UserId", {
      type: Sequelize.INTEGER,
      references: { model: "Users", key: "id" },
    });

    // Menambahkan FK ke tabel Users
    return queryInterface.addColumn("Transactions", "ProductId", {
      type: Sequelize.INTEGER,
      references: { model: "Products", key: "id" },
    });
  },

  down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn("Transactions", "ProductId");

    // Menghapus FK dari tabel Products
    return queryInterface.removeColumn("Transactions", "UserId");
  },
};
