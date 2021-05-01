'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('priceData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID
      },
      price: {
        type: Sequelize.DOUBLE
      },
      coin_name: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      price_timestamp: {
        type: Sequelize.STRING
      },
      price_date: {
        type: Sequelize.STRING
      },
      request_id: {
        type: Sequelize.INTEGER
      },
     
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('priceData');
  }
};