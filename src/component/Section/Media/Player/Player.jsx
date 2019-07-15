import React, { useEffect } from 'react';
import style from './Player.module.css';

const Player = (props) => {
    let audio = React.createRef(),
        progressBar = React.createRef(),
        valume = React.createRef(),
        rewind = 10;
    useEffect(() => {
        let startTime = 0
        props.store.elemAudio(audio.current)
        props.store.forward(progressBar.current);
        startTime = parseInt(audio.current.currentTime);
        props.store.setTime(startTime, audio.current.duration);
    })
    function changeValume() {
        props.store.changeValume(valume.current.value)
    }
    function changeTimePrev(e) {
        audio.current.currentTime -= rewind
        e.stopPropagation()
    }
    function changeTimeForward() {
        audio.current.currentTime += rewind
    }
    function repeat(e){
        let elem = e.target
        if(elem.innerText === 'All') {elem.innerText = 'One'; props.store.repeat('One')}
        else if(elem.innerText === 'One') {elem.innerText = 'None'; props.store.repeat('None')}
        else if(elem.innerText === 'None') {elem.innerText = 'All'; props.store.repeat('All')}
    }
    function test(e){
        let gg = e.target
        if(gg.style.color!=='yellow'){
            gg.style.color = 'yellow'
            props.store.generator(true)
        }
        else{
            gg.style.color = '#fff'
            props.store.generator(false)
        }
    }
    return (
        <div className={style.player} >
            <audio ref={audio} src={props.store.getSrc()} type="audio/mp3"></audio>
            <div className={style.blockButton}>
                <button onClick={() => { props.store.prevTrack() }} className={`${style.buttonPrev} ${style.button}`}>prev</button>
                <button onClick={() => { props.store.changeStatus(true) }} className={style.button}>play</button>
                <button onClick={() => { props.store.changeStatus(false) }} className={style.button}>pause</button>
                <button onClick={() => { props.store.nextTrack() }} className={`${style.buttonNext} ${style.button}`}>next</button>
            </div>
            <div className={style.blockSound}>
                <div ref={progressBar} onClick={changeTimeForward} className={style.soundWall}>
                    <div onClick={changeTimePrev} className={style.soundWallActive}></div>
                </div>
                <div className={style.soundTime}>
                    <div>
                        <span>{props.store.getTime()}/</span>
                        <span>{props.store.fullTimeTrack()}</span>
                    </div>
                    <div className={style.repeat}>
                        <span>Repeat:</span>
                        <span className={style.repeatType} onClick={repeat}>All</span>
                    </div>
                </div>
                <div className={style.soundValume}>
                    <div>
                        <input ref={valume} className={style.valume} type="range" min='0' max='1' step='0.01' onChange={changeValume} />
                    </div>
                    <div className = {style.randomTrack} onClick={test}>
                        RandomTrack
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Player;