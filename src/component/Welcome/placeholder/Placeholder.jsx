import React from 'react';
import style from './Placeholder.module.css';


const Placeholder = (props)=>{
    const inputName = React.createRef(),
          inputPass = React.createRef(),
          inputCheck = React.createRef(),
          messageError = React.createRef();
    function setUser(){
        let name = inputName.current.value,
            pass = inputPass.current.value,
            check = inputCheck.current.checked,
            visPage = props.visPage()
        props.store.setUser(name, pass, check, visPage)
        props.store.checkValidInput(messageError.current);
        inputName.current.value = '';
        inputPass.current.value = '';
    }
    function closeError(){
        messageError.current.style.display = 'none'
    }
    return (
        <div className={style.placeholder}>
            <div ref={messageError} className={style.error}>
                <button onClick={closeError} className={style.closeError}>close</button>
                <span>The username must not consist of marks and numbers. 
                    Password can not contain marks of pripenaniya. 
                    The name cannot be shorter than two characters, and the password is five
                </span>
            </div>
            <input ref={inputName} className={style.input} type="text" placeholder="Enter your Name"/>
            <input ref={inputPass} className={style.input} type="password" placeholder="Enter your Password"/>
            <div className={style.blockBnt}>
                <label htmlFor='checkbox' className={style.label}>
                <input ref={inputCheck} id='checkbox' type="checkbox"/>
                    Remember Me
                </label>
                <button onClick={setUser} className={style.button}>Enter</button>
            </div>
        </div>
    );
}
export default Placeholder;