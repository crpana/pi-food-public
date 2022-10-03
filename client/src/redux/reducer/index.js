import {
    GET_RECIPES_NAME,
    SET_PAGINA,
    GET_ALL_RECIPES,
    FILTER_BY_DIETS,
    GET_DIETS,
    FILTER_BY_ORDEN,
    FILTER_BY_HEALTHSCORE,
    POST_RECIPE,
    GET_DETAILS,
    FILTER_NUEVO,
    limpiar_DETAILS,
    FILTRO_DB_API
} from "../actions";


const initialState = {
    recipes: [],
    copiaRecipes: [],
    currentPage: 1,
    typesDiets: [],
    detailsRecipes: [],
    detailsClear: []
};


const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_RECIPES_NAME:
            return {
                ...state,
                recipes: action.payload,
            };

        case SET_PAGINA:
            return {
                ...state,
                currentPage: action.payload,
            };

        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                copiaRecipes: action.payload,
            };

        case FILTER_BY_DIETS:

            const allRecipes = state.copiaRecipes;

            // const prueba=allRecipes.filter(receta=>{

            // })



            const filtroPorDietas = action.payload === 'filter by diets' ? state.copiaRecipes :
                allRecipes.filter(r => {
                    if (r.diets.length > 0) {
                        if (r.diets.find(e => e === action.payload.toLowerCase())) {
                            return r;
                        }
                        if (action.payload === 'vegetarian' && r.hasOwnProperty('vegetarian') && r.vegetarian === true) {
                            return r;
                        }


                    }
                    return false;
                })

            return {
                ...state,
                recipes: filtroPorDietas
            }

        // let stateDiets=[];

        // for(let recipe of allRecipes){
        //     if(recipe.diets.length !==0){
        //         for(let el of recipe.diets){
        //             if(el.diets===action.payload){
        //                 stateDiets=[...stateDiets,recipe]
        //             }
        //         }
        //     }
        // }

        // return {
        //     ...state,
        //     recipes: stateDiets
        // }

        case GET_DIETS:
            return {
                ...state,
                typesDiets: action.payload,
            };

        case FILTER_BY_ORDEN:

            const recetasSort = action.payload === 'ascendente' ?
                state.copiaRecipes.sort(function (a, b) {
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1;
                    }
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                state.copiaRecipes.sort(function (a, b) {
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return -1;
                    }
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: recetasSort,
            };

        case FILTER_BY_HEALTHSCORE:
            const recetasByHS = action.payload === 'maM' ?
                state.copiaRecipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) {
                        return 1;
                    }
                    if (a.healthScore < b.healthScore) {
                        return -1;
                    }
                    return 0;
                }) :
                state.copiaRecipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) {
                        return -1;
                    }
                    if (a.healthScore < b.healthScore) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: recetasByHS
            };

        case POST_RECIPE:
            return {
                ...state
            };

        case GET_DETAILS:
            return {
                ...state,
                detailsRecipes: action.payload

            };

        case limpiar_DETAILS:
            const limpio = state.detailsClear;

            return {
                ...state,
                detailsRecipes: limpio
            };


        case FILTER_NUEVO:
            const recetaByNuevo = action.payload === 'si' ?
                state.copiaRecipes.filter(r => r.healthScore >= 50 && r.healthScore <= 60) :
                state.copiaRecipes

            console.log(recetaByNuevo);

            return {
                ...state,
                recipes: recetaByNuevo,
            };

        case FILTRO_DB_API:
            // console.log(state.copiaRecipes);
            const recetaApiDb=action.payload==='db'?
            state.copiaRecipes.filter(rec=>rec.createInDb===true):
            state.copiaRecipes
            console.log(recetaApiDb);

            return {
                ...state,
                recipes:recetaApiDb
            };

            

        default:
            return state;
    }

};

export default rootReducer;