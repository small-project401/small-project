"use strict";

const experienceModel = (sequelize, DataTypes) =>
  sequelize.define("experience", {
    touristName: { type: DataTypes.STRING, required: true },
    favFood: { type: DataTypes.STRING, required: true },
    favLandmark: { type: DataTypes.STRING, required: true },
    thoughts: { type: DataTypes.STRING, required: true },
  });

module.exports = experienceModel;
