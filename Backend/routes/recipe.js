const express = require("express");
const { getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload } = require("../controller/recipe");
const verifyToken = require("../middleware/auth");
const router = express.Router();


//get all the recipes
router.get("/",getRecipes)

//get recipe for id
router.get("/:id",getRecipe)

//add recipes
router.post("/",upload.single('file'),verifyToken ,addRecipe)

//edit recipe
router.put("/:id",upload.single('file'),editRecipe)

//delete recipe
router.delete("/:id",deleteRecipe)



module.exports=router