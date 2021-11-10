"use strict";

const { Sequelize, DataTypes } = require("sequelize");

const countryModel = require("./country/model");
const experienceModel = require("./experience/model");
const userModel = require("./users");
const Collection = require("./data-collection");

const DATABASE_URL =
  process.env.NODE_ENV === "test"
    ? "sqlite:memory:"
    : process.env.DATABASE_URL || "postgres://localhost:5432/smallproject";
const DATABASE_CONFIG =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const experience = experienceModel(sequelize, DataTypes);
const country = countryModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  experience: new Collection(experience),
  country: new Collection(country),
  users: userModel(sequelize, DataTypes),
};
