
import React from "react";
import styles from '../pagination/pagination.module.css';


export default function Pagination({ recetas, paginado, recipesPerPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(recetas / recipesPerPage); i++) {
        pageNumbers.push(i)
    }
    return(
        <div>
            <ul className={styles.pagination}>
                {
                    pageNumbers?.map(n=>(
                        <li key={n.toString()}>
                            <button onClick={()=>paginado(n)}>{n}</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}