import React from 'react';

import * as s from './Forminput.styles'

const FormInput = ({inputWidth, handleChange, label, ...props }) => {
    return (
        <s.FormInputContainer inputWidth={inputWidth}>
            <s.InputContainer onChange={handleChange} {...props} />
            {
                label ? (
                    <s.InputLabel className={props && props.value && props.value.length > 0  ? 'shrink' : ''}>
                        {label}
                    </s.InputLabel>
                ) : null
            }
        </s.FormInputContainer>
    )
}

export default FormInput;