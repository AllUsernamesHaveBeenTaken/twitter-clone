import React from 'react';
import styled from 'styled-components/native';
import { SimpleLineIcons, Entypo } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';

import {colors} from '../../utils/constants';

const ICON_SIZE = 20;

const Root = styled.View`
    height: 40;
    flex-direction: row;
`;

const Button = styled(Touchable).attrs({
    feedback: 'opacity'
})`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 0px 32px;
`;

const ButtonText = styled.Text`
    font-size: 14;
    font-weight: 400;
    color: ${ props => props.theme.LIGHT_GRAY };
`;

function FeedCardBottom({favoriteCount, onFavoritePress, isFavorited }) {
    return (
        <Root>
            <Button>
                <SimpleLineIcons name='bubble' size={ICON_SIZE} color={colors.LIGHT_GRAY} />
                <ButtonText>
                    0                    
                </ButtonText>
            </Button>
            <Button>
                <Entypo name='retweet' size={ICON_SIZE} color={colors.LIGHT_GRAY} />
                <ButtonText>
                    0
                </ButtonText>
            </Button>
            <Button onPress={onFavoritePress}>
                <Entypo name={isFavorited ? 'heart' : 'heart-outlined'} size={ICON_SIZE} color={isFavorited ? 'red' : colors.LIGHT_GRAY} />
                <ButtonText>
                    { favoriteCount }
                </ButtonText>
            </Button>
        </Root>
    )
}

export default FeedCardBottom;