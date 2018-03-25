import React, { Component } from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons'
import Touchable from '@appandflow/touchable'
import SafeAreaView from 'react-native-safe-area-view';
import { Keyboard, AsyncStorage } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { colors, fakeAvatar } from '../../utils/constants';
import SIGNUP_MUTATION from '../../graphql/mutations/signup';
import Loading from '../Loading';
import { login } from '../../actions/user';

const Root = styled(Touchable).attrs({
    feedback: 'none'
})`
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.View`
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 100%;
`;

const BackButton = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlop: { top: 20, bottom: 20, right: 20, left: 20 }    
})`
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 5%;
    left: 5%;
    z-index: 1;
`;

const ConfirmButton = styled(Touchable).attrs({
    feedback: 'opacity'
})`
    position: absolute;
    bottom: 15%;
    width: 70%;
    height: 50px;
    border-radius: 10;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.PRIMARY};    
`;

const ConfirmButtonText = styled.Text`
    color: ${props => props.theme.WHITE};
    font-weight: 600;
`;

const InputWrapper = styled.View`
    height: 50;
    width: 80%;
    border-bottom-width: 1;
    border-bottom-color: ${props => props.theme.PRIMARY};
    margin: 5px 0px;
    justify-content: flex-end;
`;

const Input = styled.TextInput.attrs({
    selectionColor: colors.PRIMARY,
    autoCorrect: false
})`
    height: 30;
`;

class SignupForm extends Component {
    state = {
        fullname: '',
        username: '',
        email: '',
        password: '',
        loading: false
    }

    _onPressOutside = () => Keyboard.dismiss(); 

    _onChangeText = (text, type) => this.setState({[type]: text});

    _checkIfAllFilledIn() {
        const { fullname, username, password, email } = this.state;

        if (!fullname || !username || !email || !
            password) {
            return true;
        }
        return false;
    } 

    _onPressSignup = async () => {
        this.setState({ loading: true });
        const {fullname, email, password, username} = this.state;
        const avatar = fakeAvatar;

        try {
            const { data } = await this.props.mutate({
                variables: {
                    fullname,
                    username,
                    email,
                    password,
                    avatar
                }
            });
            await AsyncStorage.setItem('@twitterclone', data.signup.token)
            this.setState({ loading: false});
            return this.props.login();
        } catch (error) {
            throw error;
        }
    }

    render() {
        if (this.state.loading) {
            return <Loading />
        }
        return (
            <SafeAreaView>
                <Root onPress={this._onPressOutside}>
                    <BackButton  onPress={this.props.onPressBack}>
                        <MaterialIcons color={colors.SECONDARY} size={30} name="arrow-back" />
                    </BackButton>
                    <Wrapper>
                        <InputWrapper>
                            <Input 
                                placeholder='Full name'
                                autoCapitalize='words'
                                onChangeText={text => this._onChangeText(text, 'fullname')}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input 
                                placeholder='Username' 
                                autoCapitalize='none'
                                onChangeText={text => this._onChangeText(text, 'username')}                                
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input 
                                placeholder='Email address'
                                keyboardType='email-address'
                                autoCapitalize='none'                                
                                onChangeText={text => this._onChangeText(text, 'email')}                                                                
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input
                                placeholder='Password'
                                secureTextEntry
                                onChangeText={text => this._onChangeText(text, 'password')}                                
                             />
                        </InputWrapper>
                    </Wrapper>
                    <ConfirmButton onPress={this._onPressSignup} disabled={this._checkIfAllFilledIn()} >
                        <ConfirmButtonText>Sign Up</ConfirmButtonText>
                    </ConfirmButton>
                </Root>
            </SafeAreaView>
        )
    }
}

export default compose(
    graphql(SIGNUP_MUTATION),
    connect(undefined, { login }),
)(SignupForm);
