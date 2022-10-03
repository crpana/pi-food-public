import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getRecipesName } from "../../redux/actions";
import style from '../search/search.module.css'
export default function Search({setCurrentPage}) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInput(e) {
        e.preventDefault();
        // console.log(e.target.value, 'primero');
        setName(e.target.value);

    }
    function handleSubmit(e) {
        e.preventDefault();
        // console.log(name);
        if (name) {
            dispatch(getRecipesName(name))
            setCurrentPage(1)
            setName('')
        }

    }

    return (

        <React.Fragment>

            <div className={style.conteiner}>

                <input type='text' value={name} onChange={e => handleInput(e)} placeholder="ingrese receta..."></input>

                <button type="submit" onClick={e => handleSubmit(e)} className={style.boton}>Buscar</button>

            </div>
            
        </React.Fragment>
    );

}