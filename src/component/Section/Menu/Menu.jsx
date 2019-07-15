import React, {useEffect} from 'react';
import style from './Menu.module.css';

const Menu = (props) => {
    let menuItems = props.store.wrapSong
        .map((item, i)=> <li key={i} 
                        src={item.src} 
                        className={style.listItem}>
                            {item.name}-{item.title}
                        </li>);
    
    let elementClick = React.createRef();
    useEffect(()=>{
        props.store.getWrappSongs(elementClick.current)
    })
    let getElem = (e)=>{
        let x =e.target;
        props.store.MenuActiveItem(x);
        props.store.changeStatus('true');
    }
    
    return <div className={style.menu}>
        <ul ref={elementClick} className={style.menuList} onClick={getElem}>
            {menuItems}
        </ul>
    </div>
}
export default Menu;