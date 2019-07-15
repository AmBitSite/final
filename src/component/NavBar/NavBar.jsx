import React from 'react';
import style from './NavBar.module.css';
import {NavLink} from 'react-router-dom';

const NavBar = (props) => {
function clearLocalStorage(){
    // localStorage.setItem('save', 'false');
    props.store.refreshThePage('false')
}
function hide(){
    let elem = props.store.getWelcome();
    elem.style.display = 'none'
}
    return <nav className={style.nav}>
        <NavLink onClick={hide} to='/Profile'activeClassName={style.active} className={style.item} >Profile</NavLink>
        <NavLink onClick={hide} to='/Genres'activeClassName={style.active} className={style.item} >Genres</NavLink>
        <NavLink onClick={hide} to='/Bio' activeClassName={style.active} className={style.item}>Biography</NavLink>
        <button onClick={clearLocalStorage}>Get Out</button>
    </nav>
}
export default NavBar;