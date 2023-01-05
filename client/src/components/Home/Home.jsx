import React from "react";  
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getRecipes, filterByDiets, orderByName, Loading, getDiets, orderByHs } from "../../actions";
import { Link } from 'react-router-dom';
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import './Home.css'





export default function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes)
    const diets = useSelector((state) => state.diets)
    const loader = useSelector((state) => state.loader)

    


    useEffect(async () => {
        dispatch(Loading());
        await dispatch(getRecipes());
         dispatch(getDiets());
        dispatch(Loading());
    }, [dispatch])


//////////////////////////////////////////////////PAGINADO/////////////////////////////////////////////////////
    const [currentPage, setCurrentPage] = useState(1)
    const [orden, setOrden] = useState('')

    const recipesPerPage = 9;
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


//////////////////////////////////////////////////CLICKS///////////////////////////////////////////////////////

    const handleClick = (e) =>{
        e.preventDefault();
        dispatch(Loading());
        setCurrentPage(1);
        dispatch(getRecipes());
        dispatch(Loading());
    }


    async function handleFilterDiets(e){
        e.preventDefault();
        await dispatch(getRecipes());
        dispatch(filterByDiets(e.target.value))
        setCurrentPage(1);
    }

    const handleSort = (e) =>{
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleSortHS(e) {
        e.preventDefault();
        dispatch(orderByHs(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if(loader === true){
        return (
            <div className="main">
                <div className="buttontopcont">
                    <Link to="/recipe"><button className="createboton">Create Recipe</button></Link>
                    <button onClick={e => { handleClick(e) }} className="reloadboton">Reload</button>
                </div>
                <div>
                    <SearchBar paginado={paginado} />
                </div>
                <div>
                    <select onChange={e => {handleSort(e)}} className="filters">
                        <option value="">Alphabetical order</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                    <select onChange={e => {handleSortHS(e)}} className="filters">
                        <option value="">Health score order</option>
                        <option value="hasc">HS Upward</option>
                        <option value="hdesc">HS Falling</option>
                    </select>
                    <select onChange={e => handleFilterDiets(e)} className="filters">
                        <option value="all">All recipes</option>
                        {diets?.map((e) => {
                            return (
                                <option value={e.name} key={e.id}>{e.name}</option>)
                            })}
                    </select>
                </div>
                <Paginado
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado={paginado}
                />
                <div className='cards'>
                    {currentRecipes?.map(e => {
                          return (
                            <Card id={e.id} name={e.name} image={e.image} diets={e.diets} key={e.id} healthscore={e.healthscore} />
                           )
                    })}
                </div>
            </div>
        )
    }else{
        return (
            <Loader/>
        )
    }
}