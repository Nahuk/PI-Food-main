/* las acciones son un bloque de informacion que envian datos
desde tu aplicacion a tu store. Son la unica fuente de informacion
para tu store */


// las action creator son eso, funciones que crean acciones

// la funcion dispatch se encarga de las acciones a la store

import axios from "axios";

export function getRecipes(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/recipes",{});
        return dispatch({
        type:'GET_RECIPES',
        payload: json.data
        })
    }
}


export function filterByDiets(payload){
    return{
        type: "FILTER_BY_DIETS",
        payload
    }
}


export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByHs(payload){
    return{
        type: "ORDER_BY_HS",
        payload
    }
}


export function getNameRecipe(name){
    return async function(dispatch){
        try{
            let json = await axios.get("http://localhost:3001/recipes?name=" + name)
            return dispatch({
                type: "GET_NAME_RECIPE",
                payload: json.data
            })
        } catch(error){
            alert("Can't find the recipe")
        }
    }
}

export function getDiets(){
    return async function(dispatch){
        let info = await axios.get("http://localhost:3001/diets",{});
        return dispatch({
            type:"GET_DIETS",
            payload: info.data
        })
    }
}

export function postRecipes(payload){
    return async function(dispatch){
        const respuesta = await axios.post("http://localhost:3001/recipes", payload)
        return respuesta
    }
}


export function getDetail(id){
    return async function(dispatch){
        try{
            let json = await axios.get("http://localhost:3001/recipes/" + id,{})
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function Loading(){
    return{type:'LOADER'};
}