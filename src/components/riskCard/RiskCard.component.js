import React from 'react';
import {CardWrapper, ScoreWrapper, Icon } from './RiskCard.styles';

const RiskCard = ({title, score, color, icon}) => {
    console.log("this is my color", color)
    return (
        <CardWrapper color={color}>
            <Icon>{icon}</Icon>
            <h3>{title}</h3>
            <ScoreWrapper >{score}</ScoreWrapper>
        </CardWrapper>
    )
}

export default RiskCard;