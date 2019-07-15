import React, { useEffect } from 'react';
import style from './Welcome.module.css';
import Placeholder from './placeholder/Placeholder';


const Welcome = (props) => {
    let welPage = React.createRef();
    useEffect(() => {
        for (let key in localStorage) {
            let test = JSON.parse(`${localStorage.getItem(key)}`)
            if (test !== null) {
                if (test.save === true) {
                    welPage.current.style.display = 'none'
                }
            }
        }
    })
    function visPage() {
        return welPage.current
    }
    return (
        <div ref={welPage} className={style.welcomePage}>
            <Placeholder store={props.store} visPage={visPage} />
        </div>
    );
}
export default Welcome;