const { Router } = require('express');
const axios = require('axios');
const { Recipe, Diets } = require('../db');

require('dotenv').config();
const { YOUR_API_KEY } = process.env;

const router = Router();

const getDbInfo = async () => {
    try {
        const resultDb = await Recipe.findAll({
            include: {
                model: Diets,
                atributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        });
        let respuesta = await resultDb?.map(r => {
            return {
                id: r.id,
                title: r.title,
                summary: r.summary,
                healthScore: r.healthScore,
                score: r.score,
                image: r.image,
                steps: r.steps,
                diets: r.diets?.map(d => d.name),
                createInDb:r.createInDb

            };
        });
        return respuesta

    } catch (error) {
        console.log(error);
    }
}

const getApiInfo = async () => {
    try {
        // const dataApi = await axios.get(
        //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
        // );
        const dataApi = await axios.get(
            `https://run.mocky.io/v3/80bbe213-daa0-4638-bc36-ae1bd771a3c4`
        );
        // const dataApi = await axios.get(
        //     `https://run.mocky.io/v3/9ea83364-1522-4fa4-b624-623d59fc1f2a`
        // );
        const { results } = dataApi.data;

        if (results.length > 0) {

            let mapeado = await results?.map(r => {
                return {
                    idApi: r.id,
                    title: r.title,
                    summary: r.summary,
                    healthScore: r.healthScore,
                    score: r.spoonacularScore,
                    steps: r.analyzedInstructions[0] && r.analyzedInstructions[0].steps ?
                        r.analyzedInstructions[0].steps.map(p => p.step).join(' \n') :
                        '',
                    image: r.image,

                    diets: r.diets?.map(d => d),
                    types: r.dishTypes?.map(d => d),
                    vegan: r.vegan,
                    vegetarian: r.vegetarian,

                };
            });
            return mapeado;
        }

    } catch (error) {
        console.log(error);

    }
}

const getAllInfoApi = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();

    const allInfo = apiInfo.concat(dbInfo)
    return allInfo;

};




const getDbInfoByName = async (name) => {
    try {
        const resultDbByName = await getDbInfo();


        const filterByName = resultDbByName.filter(r => r.title.includes(name));
        // console.log(filterByName,'FILTERBYNAME');

        return filterByName;
        // const dataDbByName = await Recipe.findAll({
        //     where: {
        //         title: name
        //     }
        // })
        // return dataDbByName;

    } catch (error) {
        console.log(error);
    }
}

const getApiInfoByName = async (name) => {
    try {
        const dataApiByname = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&titleMatch=${name}`
        );
        const mapeadoByName = dataApiByname.data.results.map(r => {
            return {
                idApi: r.id,
                title: r.title,
                summary: r.summary,
                healthScore: r.healthScore,
                score: r.spoonacularScore,
                steps: r.analyzedInstructions[0] && r.analyzedInstructions[0].steps ?
                    r.analyzedInstructions[0].steps.map(p => p.step).join(' \n') :
                    '',
                image: r.image,

                diets: r.diets?.map(d => d),
                types: r.dishTypes?.map(d => d),
                vegan: r.vegan,
                vegetarian: r.vegetarian,

            };
        });

        return mapeadoByName;


    } catch (error) {
        console.log(error);
    }
}

const getAllInfoByName = async (name) => {
    const apiInfoName = await getApiInfoByName(name);
    const DbInfoName = await getDbInfoByName(name);
    // console.log(DbInfoName);
    const AllInfoByName = apiInfoName.concat(DbInfoName);
    return AllInfoByName;
};

// router.get('/prueba', async (req, res) => {
//     const hollaaa = await getAllInfoApi();
//     // console.log(hollaaa);
//     return res.status(400).json(hollaaa)

// })

// GET /recipes?name="..."
router.get('/recipes', async (req, res) => {
    let { name } = req.query;

    if (name) {


        const nuevoVariable = await getAllInfoByName(name)
        if (nuevoVariable.length > 0) {
            // console.log('esta lkinea easkjleda');
            return res.status(200).json(nuevoVariable);
        } else {
            res.status(404).json('no se encontraron recetas con el nombre pasado por query')
        }

    } else {
        const AllData = await getAllInfoApi();
        // console.log(AllData);
        if (AllData.length) {
            return res.status(200).json(AllData)
        } else {
            return res.status(400).json('error en la busqueda')
        }
    }
})


//-----------------------------------------------------------------------------------------------------------------------------------------//

const getApiInfoById = async (id) => {
    try {
        const dataApiById = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`
        );

        const receta = {
            idApi: dataApiById.data.id,
            image: dataApiById.data.image,
            title: dataApiById.data.title,
            types: dataApiById.data.dishTypes?.map(d => d),
            diets: dataApiById.data.diets?.map(d => d),
            summary: dataApiById.data.summary,
            healthScore: dataApiById.data.healthScore,
            // steps: dataApiById.data.analyzedInstructions[0] && dataApiById.data.analyzedInstructions[0].steps ?
            //     dataApiById.data.analyzedInstructions[0].steps.map(p => p.step).join(' \n') :
            //     '',
            steps: dataApiById.data.instructions

        }

        return receta;

    } catch (error) {
        console.log(error);
    }
};

const getDbInfoById = async (id) => {
    try {
        const dataDbById = await Recipe.findByPk(id, {
            include: {
                model: Diets,
                atributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        });
        return dataDbById;
    } catch (error) {
        console.log(error);
    }
};

//GET /recipes/{idReceta}
router.get('/recipes/:idReceta', async (req, res) => {
    const { idReceta } = req.params;



    try {

        const dataDb = await getDbInfoById(idReceta);
        // res.status(200).json(dataDb);
        // console.log(dataDb,'de la db');
        // const traerDataApi = await getApiInfoById(idReceta);
        // console.log(traerDataApi,'de la api');
        // res.status(200).json(traerDataApi);

        if (!dataDb) {
            const traerDataApi = await getApiInfoById(idReceta);
            if (traerDataApi) {
                res.status(200).json(traerDataApi);
            } else {
                res.status(404).json('no se encontro receta,,');
            }
        } else {
            res.status(200).json(dataDb);
        }
    } catch (error) {
        console.log(error);
    }

})

//-----------------------------------------------------------------------------------------------------------------------------------------//

// POST /recipes

router.post('/recipes', async (req, res) => {
    const { title, summary, healthScore, steps, diets, score, image } = req.body;
    try {
        //Crea una receta en la base de datos relacionada con sus tipos de dietas.

        const dietaDb = await Diets.findAll({
            where: {
                name: diets,
            }
        });

        const nuevaReceta = await Recipe.create({
            title,
            summary,
            healthScore,
            steps,
            score,
            image:image?image:'https://i.ytimg.com/vi/pecKFzpJ20A/hqdefault.jpg'
            

        });


        nuevaReceta.addDiets(dietaDb)
        return res.status(200).json('Receta creada con exito!!')


    } catch (error) {
        console.log(error);
    }
})

//-----------------------------------------------------------------------------------------------------------------------------------------//
const getAllDiets = async () => {
    const dietas = await Diets.findAll();
    return dietas;
}

// GET /diets
router.get('/diets', async (req, res) => {
    const allDietas = await getAllDiets();
    res.status(200).json(allDietas)
})

module.exports = router;
