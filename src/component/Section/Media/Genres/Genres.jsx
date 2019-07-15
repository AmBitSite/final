import React from 'react';
import style from './Genres.module.css';
const Genres = (props) => {
    return <div className={style.genres}>
        <div className={style.blockButton}>
            <button onClick={()=>{props.store.sort('Rap')}} className={style.button}>Rap</button>
            <button onClick={()=>{props.store.sort('Rock')}} className={style.button}>Rock</button>
            <button onClick={()=>{props.store.sort('Electro')}} className={style.button}>Electro</button>
            <button onClick={()=>{props.store.sort(undefined)}} className={style.button}>All</button>
        </div>
    </div>
};
export default Genres;