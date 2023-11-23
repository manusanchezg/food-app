const { Router } = require("express");
const { getDiets } = require("../controllers/index")
const router = Router();

router.get("/", async (req, res) =>{
    try {
        const diets = await getDiets()
        res.send(diets)
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router