import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByDiets, filterByHealthScore, filterByOrden, getDiets } from "../../redux/actions";

import styles from '../filters/filtersOptions.module.css';

export default function FiltersOptions({ setOrden, setCurrentPage }) {

    const dispatch = useDispatch();
    const dietas = useSelector(state => state.typesDiets);

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])



    // console.log(dietas);

    function handleFilterDiets(e) {
        e.preventDefault()
        dispatch(filterByDiets(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterOrder(e) {
        e.preventDefault()
        dispatch(filterByOrden(e.target.value))

        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterHealthScore(e) {
        e.preventDefault()
        dispatch(filterByHealthScore(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)

    }

    // function handleFilterNuevo(e){
    //     e.preventDefault()
    //     dispatch(filterNuevo(e.target.value))
    //     setCurrentPage(1)

    // }

    // function handleFilterByDboApi(e) {
    //     e.preventDefault()
    //     dispatch(filtroDbAPI(e.target.value))
    //     setCurrentPage(1)
    // }


    return (


        <div className={styles.filterSort}>




            <span>filter by diets: </span>
            <select onChange={e => handleFilterDiets(e)} defaultValue='filter by diets' >
                <option disabled={false}>filter by diets</option>
                {
                    dietas?.map(type => (
                        <option key={type.name} value={type.name}>{type.name}</option>
           

                    ))
                }
            </select>


            <span>filter by order: </span>
            <select defaultValue='filter by order' onChange={e => handleFilterOrder(e)}>
                <option disabled>filter by order</option>
                <option key='ascendente' value='ascendente'>A-Z</option>
                <option key='descendente' value='descendente'>Z-A</option>
            </select>




            <span>filter by score: </span>
            <select defaultValue='filter by score' onChange={e => handleFilterHealthScore(e)}>
                <option disabled>filter by score</option>
                {/* <option value='healthScore'>HealthScore</option> */}
                <option value='Mam'>Mayor a Menor</option>
                <option value='maM'>Menor a Mayor</option>

            </select>


            {/* <span>filter by healthScore [50,90]</span>
            <select onChange={e=>handleFilterNuevo(e)}>
                <option disabled>filter by healthScore [50,90]</option>
                <option value='si'>si</option>
                <option value='no'>no</option>

            </select> */}

            {/* <span>filter by db o API: </span>
            <select onChange={e=>handleFilterByDboApi(e)}>
                <option>''</option>
                <option value='db'>DB</option>
                <option value='api'>API</option>

            </select> */}


        </div>

    );
}