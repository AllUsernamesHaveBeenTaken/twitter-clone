import React from 'react';
import styled from 'styled-components/native';

import FeedCardHeader from './FeedCardHeader';
import FeedCardBottom from './FeedCardBottom';

const Root = styled.View`
    min-height: 180;
    background-color: ${ props => props.theme.WHITE };
    width: 100%;
    shadowColor: ${ props => props.theme.SECONDARY };
    shadowOffset: 0px 2px;
    shadowRadius: 2;
    shadowOpacity: 0.1;
    padding: 7px; 
    margin: 5px 0px;   
`;

const CardContentContainer = styled.View`
    flex: 1;
    padding: 10px 20px 10px 0px;
`;

const CardContentText = styled.Text`
    font-size: 14;
    text-align: left;
    font-weight: 500;
    color: ${ props => props.theme.SECONDARY };
`;

function FeedCard({text, user, createdAt, favoriteCount}) {
    return (
        <Root>
            <FeedCardHeader {...user} createdAt={createdAt} />
            <CardContentContainer>
                <CardContentText>
                {text}
                </CardContentText>
            </CardContentContainer >
            <FeedCardBottom favoriteCount={favoriteCount} />
        </Root>
    )
}

export default FeedCard;