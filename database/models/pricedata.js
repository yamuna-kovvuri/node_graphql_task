'use strict';
module.exports = (sequelize, DataTypes) => {
  const priceData = sequelize.define('priceData', {
    uuid: DataTypes.UUID,
    price: DataTypes.DOUBLE,
    coin_name: DataTypes.STRING,
    currency: DataTypes.STRING,
    price_timestamp: DataTypes.STRING,
    price_date: DataTypes.STRING,
    request_id: DataTypes.INTEGER
  }, {});
  priceData.associate = function(models) {
    // associations can be defined here
  };
  return priceData;
};