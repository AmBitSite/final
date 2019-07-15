import React from 'react';
import style from './Profile.module.css';

const Profile = (props) => {
    let reatingTrack;
        var arrUserInStorage = props.store.returnUserInStorage(),
        profileImg = arrUserInStorage.imgProfile || 'https://thequestion.s3.eu-central-1.amazonaws.com/212/647088-54fe466f.jpeg',
        lastTrack = arrUserInStorage.lastTrack || 'no songs heard',
        userName = arrUserInStorage.name,
        parseReating = props.store.pasreReatig()
        
    for (let i = 0, j = parseReating.length; i < j; i++) {
        let flag = false;
        for (let ii = 0, jj = parseReating.length; ii < jj; ii++) {
            if (+parseReating[i].reating > +parseReating[ii].reating)
                [parseReating[i], parseReating[ii]] = [parseReating[ii], parseReating[i]];
            flag = true;
        }
        if (!flag) break;
        reatingTrack = parseReating.map((item, i) => <li key={i}>{item.name} - {item.reating}</li>)
    }
    const inputURL = React.createRef();
    function changeImg() {
        if (inputURL.current.value !== '') {
            props.store.setUserImg(inputURL.current.value)
            inputURL.current.value = ''
        }
    }
    return <div className={style.profile}>
        <div className={style.info}>
            <div className={style.blockName}>
                <span>Your name: </span>
                <span>{userName}</span>
            </div>
            <div className={style.blockLoadImg}>
                <div className={style.changeImgInfo}>
                    <span>Want to change the photo?</span>
                    <span>Paste your photo URL below</span>
                </div>
                <input className={style.unputUrl} ref={inputURL} type="text" placeholder="Enter URL image" />
                <button onClick={changeImg} className={style.btnLoadImg}>Preview</button>
            </div>
            <div className={style.LastTrack}>
                <span>Your last song: </span>
                <p>{lastTrack}</p>
            </div>
        </div>
        <div>
            <div>
                Reating:
            </div>
            <ul>
                {reatingTrack}
            </ul>
        </div>
        <div className={style.blockImage}>
            <img className={style.image} src={profileImg} alt="profileImg" />
        </div>
    </div>
};
export default Profile;