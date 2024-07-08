import React from 'react';
import { CardWrapper, ScoreWrapper, Icon } from './RiskCard.styles';

const RiskCard = ({ title, score, color, icon, fontColor }) => {
    return (
        <CardWrapper color={color}>
            <Icon>{icon}</Icon>
            <h3 style={{ color: fontColor }}>{title}</h3>
            <ScoreWrapper>{score}</ScoreWrapper>
        </CardWrapper>
    )
}

export default RiskCard;