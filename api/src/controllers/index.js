const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

async function getAllFood() {
  //Gets the food from the API and DB and it saved in an array//
  const getFood = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const mappedGetFood = getFood.data.results.map((recipe) => {
    return {
      spoonacularScore: recipe.spoonacularScore,
      healthScore: recipe.healthScore,
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      diets: recipe.diets.map((diet) => diet),
      analyzedInstructions: recipe.analyzedInstructions.map(
        (instruction) => instruction
      ),
    };
  });
  const getDBFood = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const mappedDBFood = getDBFood.map((recipe) => recipe.toJSON());
  const allFood = [...mappedDBFood, ...mappedGetFood];
  return allFood;
}

async function SearchRecipes(value) {
  const allFood = await getAllFood()
  const filteredFood = [];
  //if a search input is passed, filter the array//
  if (value) {
    allFood.map((recipe) => {
      if (recipe.title.toLowerCase().includes(value.toLowerCase()))
        filteredFood.push(recipe);
    });
    if (!filteredFood.length){
      throw new Error(
        `Oops! 🤭 It looks like ${value} it's not on the menu 😅`
        );

    }
    return filteredFood;
  }
  else  return allFood;
}

async function getFoodId(idReceta) {
  //if idReceta is different than a number//
  if (isNaN(idReceta)) {
    const findDBRecipe = await Recipe.findByPk(idReceta, {
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    return findDBRecipe;
  }

  const getFoodById = await axios.get(
    `https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}`
  );
  const {
    id,
    title,
    image,
    dishTypes,
    diets,
    summary,
    spoonacularScore,
    healthScore,
    analyzedInstructions,
  } = getFoodById.data;

  const recipeFood = {
    id,
    title,
    image,
    dishTypes,
    diets,
    summary,
    spoonacularScore,
    healthScore,
    analyzedInstructions,
  };

  return recipeFood;
}

async function getDiets() {
  const dietsApi = [
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
    "whole30",
  ];
  //Create all the diets in the DB//
  dietsApi.map((diet) => {
    Diet.findOrCreate({ where: { name: diet } });
  });

  const allDiets = await Diet.findAll();
  return allDiets;
}

async function createNewRecipe(
  title,
  summary,
  spoonacularScore,
  healthScore,
  analyzedInstructions,
  myDataBase,
  image,
  diet
) {
  //a lot of if's
  if (!title || !summary)
    throw new Error(
      "Oops!🤭 It looks like you did not fill all mandatory fields🤔"
    );
  if (spoonacularScore < 0 || spoonacularScore > 100)
    throw new Error("You have to enter a valid Score");
  if (healthScore < 0 || healthScore > 100)
    throw new Error("You have to enter a valid health score");

  const regex = /^[a-zA-Z ]+$/;
  const regex2 = /^[ ]/g;
  if (!regex.test(title) || regex2.test(title))
    throw new Error("You have to enter a valid title");

  const newRecipe = await Recipe.create({
    title,
    summary,
    spoonacularScore,
    healthScore,
    analyzedInstructions,
    myDataBase,
    image,
  });
  if (diet[0] !== undefined) {
    const dietsDB = await Diet.findAll({
      where: { name: diet },
    });
    newRecipe.addDiet(dietsDB);
  }

  return `Your recipe "${newRecipe.title}" was created succesfully! 👏👏👏`;
}

module.exports = {
  getAllFood,
  getFoodId,
  createNewRecipe,
  SearchRecipes,
  getDiets,
};
