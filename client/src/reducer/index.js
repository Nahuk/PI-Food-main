/* cuando un componente dispara una action el estado viejo pasa
por el reducer, el reducer evalua el tipo de accion se despacho 
y en funcion de eso devuelve un nuevo estado */

// el reducer recibe las acciones y modifica el estado
const initialState = {
    recipes: [],
    diets: [],
    detail: {},
    loader: true,
}


function rootReducer (state= initialState, action){ 
    switch(action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload
            }
            case 'FILTER_BY_DIETS':
            const result = state.recipes;
            if (action.payload === "all") {
                return {
                    ...state,
                    recipes: result,
                }
            } else {
                const ff = result.filter(r => r.diets?.some((d) => d === action.payload))
                return {
                    ...state,
                    recipes: ff,
                }
            };
            case "ORDER_BY_NAME":
                let arrOrdenado = action.payload === "asc" ?
                state.recipes.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) : state.recipes.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: arrOrdenado
            }
            case 'ORDER_BY_HS':
            let sortedHS = action.payload === "hasc" ?
                state.recipes.sort(function (a, b) {
                    if (a.healthscore > b.healthscore) {
                        return 1;
                    }
                    if (b.healthscore > a.healthscore) {
                        return -1;
                    }
                    return 0;
                }) : state.recipes.sort(function (a, b) {
                    if (a.healthscore > b.healthscore) {
                        return -1;
                    }
                    if (b.healthscore > a.healthscore) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: sortedHS
            }
            case "POST_RECIPE" :
                return{
                    ...state
                }
            case "GET_DIETS" :
                return{
                    ...state,
                    diets: action.payload
                }
            case "GET_NAME_RECIPE" :
                return{
                    ...state,
                    recipes: action.payload
                }
            case "GET_DETAIL":
                return{
                    ...state,
                    detail: action.payload
                }
                case 'LOADER':
                    const loader = state.loader
                    if (loader === true) {
                        return {
                            ...state,
                            loader: false,
                        }
                    } else {
                        return {
                            ...state,
                            loader: true,
                        }
                    }
            default:
                return state;
    }
}


export default rootReducer;