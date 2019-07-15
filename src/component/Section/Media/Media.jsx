import React, {useEffect} from 'react';
import style from './Media.module.css';
import Player from './Player/Player';
import Profile from './Profile/Profile';
import Genres from './Genres/Genres';
import Bio from './Bio/Bio';
import {Route} from 'react-router-dom';
const Media = (props) => {
    let welcome = React.createRef();
    useEffect(()=>{
        props.store.welcome(welcome.current)
        if(window.location.href !== `${window.location.origin}/#/`)welcome.current.style.display='none'
    })
    return (
        <section className={style.media}>
            <Player store = {props.store}/>
            <div ref={welcome} className={style.welcome}>
                <h1 className={style.header}>Welcome to music player page! Here you can listen to music and read artist biography</h1>
            </div>
            <Route path='/profile'  render = {()=><Profile store = {props.store}/>}/>
            <Route path='/genres' render = {()=><Genres store = {props.store} />}/>
            <Route path='/bio'  render = {()=><Bio store = {props.store} />}/>
        </section>
    )
}
export default Media;