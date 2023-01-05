import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, Loading } from "../../actions";
import Loader from "../Loader/Loader";
import "./Detail.css"

export default function Detail(props){
    const dispatch = useDispatch();
    const myRecipe = useSelector((state) => state.detail)
    const loader = useSelector(state => state.loader)

    const {id} = useParams();

    useEffect(async () => {
        dispatch(Loading());
        await dispatch(getDetail(id));
        dispatch(Loading());
    }, [dispatch]);
    
    /* if (loader === true && recetas[0] && recetas[0].id == id) */

    if(loader === true && myRecipe[0] && myRecipe[0].id == id){
        return (
            <div className="main">
            <div>
                <Link to={`/home`}><button className="back">Back</button></Link>
            </div>
                {
                    myRecipe.length > 0 ?
                    <div>
                        <h1>{myRecipe[0].name}</h1>
                        <div>
                            <img src={myRecipe[0].image} alt="img not found" width="350px" height="250px" />
                        </div>
                        <div>
                            <h4>Resumen:</h4><p className="resumen">{myRecipe[0].summary}</p>
                        </div>
                        <div >
                            <div><h4>Health Score:</h4><p className="hs">{myRecipe[0].healthscore}</p></div>
                            <div><h4>Diet type:</h4><p className="dt">{myRecipe[0].diets.join(", ")}</p></div>
                        </div>
    
                        <div>
                        <h4>Step by Step:</h4>
                        <ol>
                            {Array.isArray(myRecipe[0].steps) ? myRecipe[0].steps.map(e => {
                                return (
                                    <li className="sbs">{e}</li>
                                )
                            }) : <p className="sbs">No action steps reported for this recipe</p>}</ol>
                        </div>
    
                    </div> : <p>...Loading</p>
                }
            </div>
        )
    } else{
        return (
            <Loader/>
        )
    }
    
}