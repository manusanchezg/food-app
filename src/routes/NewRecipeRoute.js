const { Router } = require("express");
const { createNewRecipe } = require("../controllers");
const router = Router();

router.post("/", async (req, res) => {
  const {
    title,
    summary,
    spoonacularScore,
    healthScore,
    analyzedInstructions,
    myDataBase,
    diets,
    image
  } = req.body;
  try {
    const newRecipe = await createNewRecipe(
      title,
      summary,
      spoonacularScore,
      healthScore,
      analyzedInstructions,
      myDataBase,
      image,
      diets
    )
    res.status(201).send(newRecipe)
  } catch (error) {
    res.status(400).json(error.message)
  }
});

module.exports = router;
