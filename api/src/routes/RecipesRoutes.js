const { Router } = require("express");
const { getAllFood, getFoodId, SearchRecipes, deleteRecipe } = require("../controllers");
const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const searchFood = await SearchRecipes(name);
      res.status(201).json(searchFood);
    } else {
      const getFood = await getAllFood();
      res.status(201).json(getFood);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
});


router.get("/:idReceta", async (req, res) => {
  const { idReceta } = req.params;
  try {
    const getFood = await getFoodId(idReceta);
    res.json(getFood);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;
