import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { getDetails, clearDetails } from "../../redux/actions";
import style from '../details/details.module.css';
// import imgDefault from '../../img/recipeDefault.jpg'


export default function Details() {

    const dispatch = useDispatch()
    const { id } = useParams()

    

    useEffect(() => {
        dispatch(getDetails(id))
        return () => dispatch(clearDetails())
    }, [dispatch, id])
    const AllRecipes = useSelector(state => state.detailsRecipes)


    // console.log(typeof AllRecipes);


    return (
        <React.Fragment>


            {
                Object.keys(AllRecipes).length > 0 ?


                    <div className={style.mainContainer}>



                        <div>

                            <h1 className={style.contitle}>{AllRecipes.title}</h1>

                            <div className={style.detailContainer}>

                                <div className={style.leftContainer}>

                                    <img src={AllRecipes.image} alt=''></img>

                                    <div className={style.detailHealth}>
                                        <h1>{AllRecipes.healthScore}</h1>
                                    </div>

                                </div>

                                <div className={style.rightContainer}>

                                    <h1>summary</h1>

                                    <div className={style.summaryDetalles}>
                                        <p dangerouslySetInnerHTML={{
                                            __html: AllRecipes.summary,
                                        }}></p>
                                    </div>

                                    <h1>steps</h1>

                                    <div className={style.stepsDetalles}>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: AllRecipes.steps,
                                            }}
                                        ></p>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div>
                            <Link to='/home'>
                                <button className={style.boton}>Back to Home</button>
                            </Link>
                        </div>



                    </div>
                    :

                    <div className={style.mainContainer}>
                        <h1>cargando detalles</h1>
                    </div>
            }



        </React.Fragment>

    );
}