const { Router } = require('express');
const axios = require("axios")
const {API_KEY} = process.env
const {Recipe, TypeDiet} = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

/* `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100` */
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    
    try {
        const apiUrl= await axios({
            method: 'get',
            url: "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5",
            headers: {"Accept-Encoding": "null"}
        })
        
        
        const apiInfo = await apiUrl.data.results?.map((e) =>{
            return{
                id: e.id,
                name: e.title,
                summary: e.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
                healthscore: e.healthScore,
                image: e.image,
                diets: e.diets,
                dishtypes: e.dishTypes,
                steps: e.analyzedInstructions[0]?.steps.map(e => {
                    return (e.step)
                })
            }
        })
        
        return apiInfo;
    } catch (error) {
        return error
    }
    

    
}


const getDBinfo = async () => {
    try {
        const recipes= await Recipe.findAll({
            include: {
                model: TypeDiet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }})
            return await recipes.map(e=>{
                return{
                    id: e.id,
                    name: e.name,
                    summary: e.summary,
                    healthscore: e.healthscore,
                    image: e.image,
                    steps: e.steps,
                    dishtypes: e.dishtypes,
                    diets: e.TypeDiets.map(e=>e.name)
                }
            })
    } catch (error) {
        return res.status(404).send(error)
    }
}


const getALLRecipes = async () => {
    const apiInfo = await getApiInfo() 
    const dbInfo = await getDBinfo()
    const allInfo = dbInfo.concat(apiInfo);
    return allInfo;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                    /* RUTAS */

router.get("/recipes", async (req, res) => {

    const { name } = req.query;
    let allInfo = await getALLRecipes();
    
    if (name) {
        try {
        let filteredRecipe = await allInfo.filter((e) =>
            e.name.toLowerCase().includes(name.toLowerCase())
        );
        filteredRecipe.length
            ? res.status(200).send(filteredRecipe)
            : res.status(404).send("No encontramos receta con ese nombre");
        } catch (error) {
        return res.status(400).send("Algo salio mal");
        }
    } else {
        res.send(allInfo);
    }
    });


router.get("/recipes/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const recipesTotal = await getALLRecipes();
        if (id) {
            let recipeId = await recipesTotal.filter((r) => r.id == id);
            if(recipeId.length) res.status(200).json(recipeId)  
        } }catch (error) {
        res.status(404).send(error,"No encontramos esta receta");
        }    
    });




    router.get("/diets", async (req, res) => {
        let types = [
            "gluten free",
            "dairy free",
            "paleolithic",
            "lacto ovo vegetarian",
            "primal",
            "whole 30",
            "fodmap friendly",
            "ketogenic",
            "pescatarian",
            "vegan"
        ]
        types.forEach(async (e)=> {
            await TypeDiet.findOrCreate({
                where: { name: e }
            })
        });
        let result = await TypeDiet.findAll()
        return res.send(result)
    });



    router.post("/recipes", async(req,res) => {
        let{ name, summary, healthscore, steps, diets, image, dishtypes } = req.body
        try {
            let recipeCreated = await Recipe.create({
                name,
                summary,
                healthscore,
                image: image?image:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-recipe-book-design-template-96cfa4235ae5da396de74c3bdad442f7_screen.jpg?ts=1597154519',
                steps,
                dishtypes
            });
            
            const typediet = await TypeDiet.findAll({
                where: {name: diets}
            });
            await recipeCreated.addTypeDiet(typediet)
            res.status(200).send(recipeCreated)
        } catch (error) {
            res.status(404).send(error)
        }
    })



module.exports = router;
