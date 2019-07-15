import React from 'react';
import style from './Bio.module.css';

const Bio = (props) => {
    let bioArr = props.store.getBio()
    return <div className={style.bio}>
        <div className={style.imgContain}>
            <img src={bioArr[0]} alt='img' className={style.img} />
        </div>
        <span className={style.text}>
            {bioArr[1]}
        </span>
    </div>
};
export default Bio;