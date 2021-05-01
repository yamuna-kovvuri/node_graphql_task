'use strict';
module.exports = (sequelize, DataTypes) => {
  const userRequests = sequelize.define('userRequests', {
    uuid: DataTypes.UUID,
    status: DataTypes.STRING,
    price_timestamp: DataTypes.STRING,
    coin_name: DataTypes.STRING
  }, {});
  userRequests.associate = function(models) {
    // associations can be defined here
  };
  return userRequests;
};