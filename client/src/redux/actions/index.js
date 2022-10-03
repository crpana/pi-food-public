import axios from 'axios';

export const GET_RECIPES_NAME = 'GET_RECIPES_NAME';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const SET_PAGINA = 'SET_PAGINA';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_BY_ORDEN = 'FILTER_BY_ORDEN';
export const FILTER_BY_HEALTHSCORE = 'FILTER_BY_HEALTHSCORE';
export const POST_RECIPE = 'POST_RECIPE';
export const GET_DETAILS = 'GET_DETAILS';


export const FILTER_NUEVO = 'FILTER_NUEVO';
export const limpiar_DETAILS = 'limpiar_DETAILS';
export const FILTRO_DB_API='FILTRO_DB_API';

export function getRecipesName(name) {
    return async function (dispatch) {
        try {

            const recetas = await axios.get(`http://localhost:3001/recipes?name=${name.toLowerCase()}`);
            // console.log(name);
            return dispatch({
                type: GET_RECIPES_NAME,
                payload: recetas.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function setPagina(payload) {
    return {
        type: SET_PAGINA,
        payload
    };

}

export function getRecipes() {
    return async function (dispatch) {
        let result = await axios.get(`http://localhost:3001/recipes`, {});
        return dispatch({
            type: GET_ALL_RECIPES,
            payload: result.data,

        })
    }
}

export function getDiets() {
    return async function (dispatch) {
        let alldietas = await axios.get(`http://localhost:3001/diets`, {})
        return dispatch({
            type: GET_DIETS,
            payload: alldietas.data,
        })
    }
}

export function filterByDiets(payload) {
    return {
        type: FILTER_BY_DIETS,
        payload: payload,

    }
}

export function filterByOrden(payload) {
    return {
        type: FILTER_BY_ORDEN,
        payload: payload
    };
}

export function filterByHealthScore(payload) {
    return {
        type: FILTER_BY_HEALTHSCORE,
        payload: payload
    };
}


export function postRecipes(payload) {

    console.log(payload, 'este es el payload de postRecipes');

    return async function (dispatch) {
        let json = await axios.post(`http://localhost:3001/recipes`, payload)
        return dispatch({
            type: POST_RECIPE,
            payload: json,
        })
    }
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/recipes/${id}`)
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })

        } catch (error) {
            console.log(error);
        }

    };
}


// export function filterNuevo(payload) {
//     return {
//         type: FILTER_NUEVO,
//         payload: payload

//     };
// }


export function clearDetails() {
    return {
        type: limpiar_DETAILS,
       
    }
}


export function filtroDbAPI(payload){
    return{
        type:FILTRO_DB_API,
        payload:payload
    }
}