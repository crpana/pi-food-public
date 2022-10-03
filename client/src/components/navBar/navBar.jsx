import { Link } from "react-router-dom";
import React from "react";
import style from '../navBar/navBar.module.css';

export default function NavBar() {
    return (
        <div className={style.nav}>
            <div className={style.navLeft}>
                <Link to='/'>
                    <span>Home</span>
                </Link>
            </div>

            <nav className={style.navRight}>
                <ul className={style.List}>
                    <li className={style.navListItems}>

                        <Link to='/home'>Ver Recetas</Link>


                    </li>
                    <li className={style.navListItems}>
                        <Link to='/create'>  Crear Receta</Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
}