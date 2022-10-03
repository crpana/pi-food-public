import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, postRecipes } from "../../redux/actions";
import styles from '../createRecipe/createRecipe.module.css';



function validar(input) {
    var error = {};

    if (!input.title) {
        error.title = 'type a title'
    } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(input.title)) {
        error.title = '"No numbers or special characters are allowed";'
    } else {
        error.title = ''
    }


    if (!input.healthScore) {
        error.healthScore = 'type a health score'
    } else if (!/^(?!$)(?:[0-9]{1,2}|100)$/gm.test(input.healthScore)) {
        error.healthScore = 'health score is a number between 0 and 100.'
    } else {
        error.healthScore = ''
    }


    if (!input.summary) {
        error.summary = 'summary is a description of the recipe'
    } else {
        error.summary = ''
    }


    if (!input.steps) {
        error.steps = 'enter step by step in detail'
    } else {
        error.steps = ''
    }

    return error;


}


export default function CreateRecipe() {

    const dispatch = useDispatch();
    const alldietas = useSelector(state => state.typesDiets);
    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])


    const [error, setError] = useState({})

    const [input, setInput] = useState({
        title: '',
        healthScore: '',
        summary: '',
        steps: '',
        diets: [],
        
    })

    function handleChange(e) {
        setError(
            validar({
                ...input,
                [e.target.name]: e.target.value
            })
        )
        
        // console.log(input,'input');

        setInput({
            ...input,
            [e.target.name]: e.target.value, //e.target.title va a set cada type que tengan los <inputs/>
        })
        // console.log(input,'ACA');


    }
    


    function handleCheck(e) {
        // console.log(input.diets);

        if (e.target.checked) {

            setInput({
                ...input,
                diets: [...input.diets, e.target.value],
            })


        } else {
            setInput({
                ...input,
                diets: input.diets.filter(d => e.target.name !== d)
                //habra un array con las dietas que seleccione ['dairy free', 'Ketogenic', 'Vegetarian']
                //cada que saquemos un check filtrara y devolvera un array con los con todos los nombres,
                // pero sin el nombre al que saque el check
                //por ejemplo: en pantalla le saco el check a Ketogenic y quedara el siguiente array ['dairy free','Vegetarian']

            })


        }


    }



    function handleSubmit(e) {
        e.preventDefault()
        if (
            !error.title && input.title && !error.healthScore && input.healthScore && !error.summary && input.summary && !error.steps && input.steps && input.diets.length
        ) {
            dispatch(postRecipes(input))
            console.log(input,'SE CREO LA RECETA!!!');
            setInput({
                title: '',
                healthScore: '',
                summary: '',
                steps: '',
                diets: [],
                
            })
            document.querySelectorAll('#idRecipe input[type=checkbox]').forEach(function (checkElement) {
                checkElement.checked = false
            })
            alert('Se creo la receta!!')
        } else {

            alert('revise los campos !!')
        }




    }

    function clearform(e) {
        e.preventDefault()
        setInput({
            title: '',
            healthScore: '',
            summary: '',
            steps: '',
            diets: [],
            

        })

        document.querySelectorAll('#idRecipe input[type=checkbox]').forEach(function (checkElement) {
            checkElement.checked = false
        })


    }



    return (
        <React.Fragment>
            <div className={styles.formMainContainer}>


                <h2>Create a new recipe</h2>

                <form onSubmit={e => handleSubmit(e)} id='idRecipe'>

                    <div className={styles.formContainer}>
                        <div className={styles.formContainerLeft}>

                            {/* <img value={imgDefault} onChange={(e=>handleChange(e))}/> */}

                            <input className={error.title && 'danger'}  placeholder="Title..." value={input.title} type='text' name='title' onChange={e => handleChange(e)} />
                            {error.title &&(
                                <p className="danger">{error.title}</p>
                            )}
                            {/* <p className={error.title ? 'danger' : 'pass'}>{error.title}</p> */}


                            <p className={error.healthScore ? 'danger' : 'pass'}>{error.healthScore}</p>
                            <input placeholder="Health Score.." value={input.healthScore} type='text' name='healthScore' onChange={e => handleChange(e)} />

                            <p className={error.summary ? 'danger' : 'pass'}>{error.summary}</p>
                            <textarea placeholder="Summary.." value={input.summary} name='summary' onChange={e => handleChange(e)}></textarea>

                            <p className={error.steps ? 'danger' : 'pass'}>{error.steps}</p>
                            <textarea placeholder="Steps..." value={input.steps} name='steps' onChange={e => handleChange(e)}></textarea>


                        </div>


                        <div className={styles.formContainerRight}>
                            <div className={styles.formDietas}>
                                {alldietas.length && alldietas.map(dieta => (

                                    <label key={dieta.name}>

                                        <input type='checkbox' name={dieta.name} value={dieta.name} onChange={e => handleCheck(e)} />
                                        {dieta.name}
                                    </label>

                                ))}

                            </div>

                        </div>

                    </div>

                    <div className={styles.formButton}>
                        <button onClick={e => clearform(e)} className={styles.bottonReset} >
                            Clear
                        </button>



                        {
                            error.title || !input.healthScore || !input.summary || !input.steps || !input.diets.length? //todos false para habilitar el boton
                            <button type='submit' className={styles.bottonCreate2} disabled={true}>Create</button>:
                            <button type='submit' className={styles.bottonCreate} disabled={false}>Create</button>

                        }
                    </div>

                </form>
            </div>

        </React.Fragment>
    );
}