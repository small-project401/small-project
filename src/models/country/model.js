"use strict";

const countryModel = (sequelize, DataTypes) =>
  sequelize.define("country", {
    ///user who signin
    countryName: { type: DataTypes.STRING, required: true },
    cityName: { type: DataTypes.STRING, required: true },
    language: { type: DataTypes.STRING, required: true },
  });

module.exports = countryModel;
