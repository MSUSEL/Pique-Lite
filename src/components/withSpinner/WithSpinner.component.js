import React from 'react';
import {LoaderContainer, SpinnerContainer} from './WithSpinner.styles'
const WithSpinner = WrapperComponent => {
    const Spinner = ({loading, ...otherProps}) => {
        return loading 
        ? (
            <LoaderContainer>
                <SpinnerContainer/>
            </LoaderContainer>
        )
        : (
            <WrapperComponent {...otherProps}/>
        )
    }
    return Spinner;
}

export default WithSpinner;