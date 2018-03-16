import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

import SignupForm from '../components/Authentication/SignupForm';

const Root = styled.View`
    flex: 1;
    background-color: ${props => props.theme.WHITE};
    position: relative; 
`;

const ButtonSignup = styled(Touchable).attrs({
    feedback: 'opacity'
})`
    height: 75;
    width: 150;
    background-color: ${props => props.theme.PRIMARY};
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 30%;
    right: 0;
    border-top-left-radius: 20;
    border-bottom-left-radius: 20;   
`;

const ButtonSignupText = styled.Text`
    color: ${props => props.theme.WHITE};
    font-weight: bold;
    font-size: 16;    
`;

const BottomTextContainer = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200;
    justify-content: center;
    align-items: center;
`;

const ButtonLogin = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlop: { top: 10, bottom: 10, right: 10, left: 10 }
})`
    justify-content: center;
    align-items: center;
`;

const ButtonLoginText = styled.Text`
    color: ${props => props.theme.SECONDARY};
    font-weight: 400;
    font-size: 14;   
`;

const initialState = {
    showSignup: false,
    showLogin: false
}

class AuthenticationScreen extends Component {
    state = initialState;

    _onShowSignup = () => this.setState({ showSignup: true })

    _onPressBack = () => this.setState({ ...initialState});

    render() {
        if (this.state.showSignup) {
            return <SignupForm onPressBack={this._onPressBack} />
        }
        return (
            <Root>
                <ButtonSignup onPress={this._onShowSignup}>
                    <ButtonSignupText>Sign Up</ButtonSignupText>
                </ButtonSignup>
                <BottomTextContainer>
                    <ButtonLogin>
                        <ButtonLoginText>
                            Already have an account?
                        </ButtonLoginText>
                    </ButtonLogin>
                </BottomTextContainer>
            </Root>
        )
    }
}

export default AuthenticationScreen;
