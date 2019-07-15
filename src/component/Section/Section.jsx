import React from 'react';
import style from './Section.module.css';
import Media from './Media/Media';
import Menu from './Menu/Menu';

const Section = (props) => {
    return <section className={style.section}>
        <Media store = {props.store}/>
        <Menu store = {props.store}/>
    </section>
}
export default Section;
