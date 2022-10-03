import { Link } from 'react-router-dom';
import React from 'react';

import style from '../landingPage/landingPage.module.css';



export default function LandingPage() {
    return (
        <React.Fragment>

            <div className={style.backContainer}>


                <div className={style.principalContainer}>

                    <div className={style.acomodarText}>
                        <span className={style.welcome} >Welcome to the recipe app</span>
                        {/* <span className={style.welcome}> the recipe app</span> */}
                    </div>
                    <div className={style.acomodarboton}>
                        <Link to='/home'>
                            <button className={style.boton}> ENTRAR</button>
                        </Link>
                    </div>



                </div>

                <div className={style.acomodarImg}>

                    <div className={style.imgComida1}>

                    </div>
                    <div className={style.imgComida2}>

                    </div>
                    <div className={style.imgComida3}>

                    </div>
                </div>




            </div>

        </React.Fragment>
    );
}