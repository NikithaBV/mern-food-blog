const Recipes=require("../models/recipe")
const multer  = require('multer')

//copying image in disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  //storage
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null,filename)
  }
})
//pass storge in multer
const upload = multer({ storage: storage })

const getRecipes = async(req,res)=>{
      const recipes = await Recipes.find()
    return res.json(recipes)
}

const getRecipe = async(req,res)=>{
    const recipe = await Recipes.findById(req.params.id)
    return res.json(recipe)
}

const editRecipe=async(req,res)=>{
    const {title,ingredients,instructions,time}=req.body 
    let recipe=await Recipes.findById(req.params.id)

    try{
        if(recipe){
            let coverImage=req.file?.filename ? req.file?.filename : recipe.coverImage
            await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage},{new:true})
            res.json({title,ingredients,instructions,time})
        }
    }
    catch(err){
        return res.status(404).json({message:err})
    }
    
}

const addRecipe = async(req,res)=>{
    console.log(req.user)
    const {title,ingredients,instructions,time}=req.body

    if(!title || !ingredients || !instructions)
    {
        res.json({message:"Required fields can't be empty"})
    }

    const newRecipe = await Recipes.create({
        title,ingredients,instructions,time,coverImage:req.file.filename,
        createdBy:req.user.id
    })
    return res.json(newRecipe)
}

const deleteRecipe = async(req,res)=>{
     try{
        await Recipes.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
    }
    catch(err){
        return res.status(400).json({message:"error"})
    }
}



module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload}