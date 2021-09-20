import React from 'react';

const renderField = ({label, input, type}) => {
    return (
        <div>
            <div>{label}</div>
            <input {...input} type={type} placeholder={label}/>
        </div>
    )
}

export default renderField;