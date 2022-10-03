import React from "react";
import styles from '../card/card.module.css';


export default function Card({ title, image, diets, id ,healthScore }) {
    return (

        
        <React.Fragment >

            <div className={styles.card} >

                <div className={styles.imgRecipe}>
                    <img src={image} alt="imagen de la comida" width='300px' height='250px'/>
                </div>

                <div className={styles.cardInfo}>

                    
                        <h3 className={styles.tituloCont}>{title}</h3>
                    

                    <div className={styles.dietasCont}>
                        <h5 >Tipo de dieta: </h5>
                        {
                            diets?.map((d,k) => (
                                <p key={k}>{d}</p>
                            ))
                        }
                    </div>

                    <h1>{healthScore}</h1>

                </div>
                
            </div>

        </React.Fragment>
    );
}
