import React from "react";

const Input = (props) =>{
    let inputClassName = 'form-control';
    if(props.hasError===false){
        inputClassName += _'is-valid';
    }

    return(
        <div>
           {props.label && <label>{props.label}</label>}
            <input 
            className={inputClassName}
            type={props.type || 'text'} 
            placeholder={props.placeholder}
            value={props.value}
            onChange= {props.onChange}
            />
        </div>
    );
};

Input.defaultProps = {
    onChange :() =>{

    }
};


export default Input;