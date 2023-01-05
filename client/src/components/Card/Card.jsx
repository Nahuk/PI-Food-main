import React from "react";
import { Link } from "react-router-dom";
import './Card.css'

export default function Card ({image, name, diets, id, healthscore}) {
    return(
        <div className="card">
            <Link to={`/home/${id}`}>
                <img src={image} alt="img not found" width="350px" height="250px" className="imagecard"/>
                </Link>
            <div>
            <h3 className="cardtitle">{name}</h3>
            <h5 className="carddescr">DIET TYPE: {diets.join(", ")}</h5>
            <h5 className="carddescr">HEALTH SCORE:{healthscore}</h5>
            </div>
            
        </div>
    )
}