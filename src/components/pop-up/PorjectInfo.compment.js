import React from "react";
import FormInput from "../formInput/FormInput.component";
import {SignInContainer, SignInTitle, ButtonGroupContainer} from './ProjectInfo.styles';

const ProjectInfo = () => {
    return(
        <SignInContainer>
            <SignInTitle>Set up your projects</SignInTitle>
            <FormInput />
            <FormInput />
        </SignInContainer>
    )
}