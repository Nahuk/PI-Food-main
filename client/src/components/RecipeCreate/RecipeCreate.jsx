import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getDiets, postRecipes } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./RecipeCreate.css"

function validate(input){
    let errors={};
    if(!input.name){
        errors.name="Nombre requerido";
    } if(!input.summary){
        errors.summary="Resumen requerido";
    } if(input.healthscore > 100 || input.healthscore < 0){
        errors.healthscore = "El Healt Score debe ser entre 0 y 100";
    }
    
    return errors;
}

export default function RecipeCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector(state => state.diets)
    

    const [dataSteps, setDataSteps] = useState("")
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        summary: '',
        image: '',
        healthscore: '',
        dishtypes: '',
        steps: [],
        diets: [],
    })

    useEffect(() => {
        dispatch(getDiets())

    }, [dispatch])



    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (input.name === "") {
            return alert("Please enter a dish name")
        }
        if (input.summary === "") {
            return alert("Please enter a dish summary")
        }
        if (input.image === " ") {
            setInput({
                ...input,
                image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-recipe-book-design-template-96cfa4235ae5da396de74c3bdad442f7_screen.jpg?ts=1597154519"
            })}
        if (input.healthscore > 100 || input.healthscore < 0){
            return alert("The Health Score value has to be from 0 to 100. Please enter a valid one")
        }
        
        dispatch(postRecipes(input))
        alert("The recipe was created successfully")
        setInput({
            name: '',
            summary: '',
            image: '',
            healthscore: '',
            dishtypes:[],
            steps: [],
            diets: [],
        })
        history.push('/home')
    }

    function handlerCheckbox(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        } else {
            setInput({
                ...input,
                diets: input.diets.map(r => r !== e.target.value)
            })

        }
    }

    function handlerAddSteps(e) {
        e.preventDefault();
        setInput({
            ...input,
            steps: [...input.steps, dataSteps]
        })

        setDataSteps("")
    }

    function handlerDeleteLast(e) {
        e.preventDefault();
        input.steps.pop();
        setInput({
            ...input,
        })
        setDataSteps("")
    }


    function handlerDeleteAll(e) {
        e.preventDefault();
        setInput({
            ...input,
            steps: []
        })
        setDataSteps("")
    }


    return (
        <div className="maincontainer">
            <div className="botondevolver">
                <Link to='/home'><button>Return</button></Link>
            </div>

            <form onSubmit={e => handleSubmit(e)}>
                <section className="inputsycheck">
                    <div className="inputstexto">
                        <div>
                            <label>Name: </label>
                            <input type="text" className="inputdata" value={input.name} name="name" onChange={handleChange} />
                        </div>
                        {errors.name &&(<p className="error">{errors.name}</p>)} 
                        <div>
                            <label>Resume:</label>
                            <textarea className="inputdata" value={input.summary} name="summary" rows="5" cols="35" onChange={handleChange} />
                            {errors.summary &&(<p className="error">{errors.summary}</p>)} 
                        </div>
                        <div>
                            <label>Health Score: </label>
                            <input name="healthscore" className="inputdata" type="number" value={input.healthscore} onChange={handleChange}></input>
                        </div>
                        {errors.healthscore &&(<p className="error">{errors.healthscore}</p>)} 
                        
                    </div>

                    <div className="containercheck">
                        <fieldset className="orgcontcheck">
                            <legend>Choose one or more types of diets</legend>

                            {
                                diets.map((e) => {
                                    return (
                                        <div className="organizadorcheck">
                                            <p className="textcheck">
                                            {e.name}
                                            </p>
                                            <input className="checkdietas" type="checkbox" name={e.name} value={e.name} onChange={(e) => handlerCheckbox(e)}></input>
                                        </div>


                                    )
                                })
                            }


                        </fieldset>
                    </div>
                </section>

                <section className="stepyrender">
                    <div className="stepbystep">
                        <legend>Steps: </legend>
                        <textarea value={dataSteps} name="name" onChange={e => setDataSteps(e.target.value)} row="8" col="80"></textarea>
                        <div>
                            <input type="submit" name="agregar" value="Add step" onClick={e => handlerAddSteps(e)} ></input>
                            <input type="submit" name="borrar" value="Delete last" onClick={e => handlerDeleteLast(e)}></input>
                            <input type="submit" name="borrartodo" value="Delete all" onClick={e => handlerDeleteAll(e)} ></input>
                        </div>
                    </div>

                    <div className="renderstepbystep">
                        <ol>
                            {
                                input.steps.map(e => {
                                    return (<>
                                        <li>{e}</li>
                                    </>
                                    )

                                })}
                        </ol>
                    </div>
                </section>







                <div className="mandareceta">
                    <button type="submit">CREATE</button>
                </div>

            </form>

        </div>
    );
}
