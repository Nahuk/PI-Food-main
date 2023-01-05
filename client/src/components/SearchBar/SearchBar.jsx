import React from "react";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getNameRecipe } from "../../actions";
import "./Searchbar.css"


export default function SearchBar({paginado}){
    const dispatch = useDispatch();

    const [name, setName] = useState("");

//////////////////////////////////////////////BOTONES///////////////////////////////////////////////////////////////////////////

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        await dispatch(getNameRecipe(name))
        paginado(1)
        setName("")
    }

    return (
        <div>
            <input type={"text"} placeholder="Buscar receta..." onChange={(e) => handleInputChange(e)} className="inputbuscar" />
            <button type="submit" onClick={(e) => handleSubmit(e)} className="buscar">Buscar</button>
        </div>
    )
}