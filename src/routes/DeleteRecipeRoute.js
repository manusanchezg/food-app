const { Router } = require("express");
const { deleteRecipe } = require("../controllers");
const router = Router();

router.delete("/", async (req, res) =>{
    const { id } = req.body;
    try {
      const deletedRecipe = await deleteRecipe(id)
      res.status(201).json(deletedRecipe)
    } catch (error) {
      res.status(404).send(error.message)
    }
  })

  module.exports = router