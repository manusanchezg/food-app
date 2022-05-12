const { Router } = require('express');
const express = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes =  require("./RecipesRoutes")
const newRecipe = require("./NewRecipeRoute")
const types = require("./TypesRoutes")
const deleteRecipe = require("./DeleteRecipeRoute")


const router = Router();
router.use(express.json())


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipes)
router.use("/recipe", newRecipe)
router.use("/types", types)
router.use("/deleteRecipe", deleteRecipe)

module.exports = router;
