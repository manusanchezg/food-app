const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "diet",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.ENUM(
          "gluten free",
          "dairy free",
          "ketogenic",
          "lacto ovo vegetarian",
          "lacto-vegetarian",
          "ovo-vegetarian",
          "vegan",
          "pescetarian",
          "paleo",
          "primal",
          "low FODMAP",
          "whole30"
        ),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

/* ENUM(
          "Gluten free",
          "Dairy free",
          "Ketogenic",
          "Vegetarian",
          "Lacto-Vegetarian",
          "Ovo-vegetarian",
          "Vegan",
          "Pescetarian",
          "Paleo",
          "Primal",
          "Low FODMAP",
          "Whole30",
        ), */
