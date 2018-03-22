import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

import { colors } from '../utils/constants'

const Root = styled.View`
    background-color: ${props => props.theme.WHITE};
    flex: 1;
    align-items: center;    
`;

const Wrapper = styled.View`
    height: 80%;
    width: 90%;
    padding-top: 5;
    position: relative;
`;

const Input = styled.TextInput.attrs({
    multiline: true,
    maxLength: 140, 
    selectionColor: colors.PRIMARY,
    placeholder: 'What\'s happening?',
    autoFocus: true
})`
    height: 40%;
    width: 100%;
    font-size: 18;
    color: ${ props => props.theme.SECONDARY}
`;

const TweetButton = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlope: { top: 20, left: 20, right: 20, bottom:20 }
})`
    background-color: ${props => props.theme.PRIMARY};
    justify-content: center;
    align-items: center;
    width: 80;
    height: 40;
    border-radius: 20;
    position: absolute;
    top: 60%;
    right: 0;
`;

const TweetButtonText = styled.Text`
    color: ${props => props.theme.WHITE};
    font-size: 16;
`;

const TextLength = styled.Text`
    font-size: 18;
    color: ${props => props.theme.PRIMARY};
    position: absolute;
    right: 5%;
    top: 50%;
`;

class NewTweetScreen extends Component {
    state = {
        text: ''
    };

    get _textLength() {
        return 140 - this.state.text.length;
    }

    _onChangeText = text => this.setState({ text });
    
    render() {
        return (
            <Root>
                <Wrapper>
                    <Input value={this.state.text} onChangeText={this._onChangeText} />
                    <TextLength>
                        {this._textLength}
                    </TextLength>
                    <TweetButton>
                        <TweetButtonText>
                            Tweet
                        </TweetButtonText>
                    </TweetButton>
                </Wrapper>
            </Root>
        )
    }
}

export default NewTweetScreen;
