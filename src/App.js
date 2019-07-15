import React from 'react';
import './App.css';
import NavBar from './component/NavBar/NavBar';
import Section from './component/Section/Section';
import Welcome from './component/Welcome/Welcome';
import { HashRouter } from 'react-router-dom'

function App(props) {
    return (
        <HashRouter>
            <div className="wrapper">
                <Welcome store = {props.store}/>
                <NavBar store = {props.store} />
                <Section store = {props.store} />
            </div>
        </HashRouter>
        
    )
};
export default App;