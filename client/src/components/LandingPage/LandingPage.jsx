import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

export default function LandingPage() {
    return (
        <div className="container">
            <div>
                <h1 className="texto">WELCOME TO</h1>
                <h1 className="texto2">PI-FOOD HENRY</h1>
                <Link to="/home">
                    <button className="boton">Ingresar</button>
                </Link>
            </div>
        </div>
    )
}