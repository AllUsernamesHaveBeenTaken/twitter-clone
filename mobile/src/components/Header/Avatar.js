import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import { logout } from '../../actions/user';

import Loading from '../Loading';
import HeaderButton from './Button';

const AVATAR_SIZE = 30;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Avatar = styled.Image`
    height: ${AVATAR_SIZE};
    width: ${AVATAR_SIZE};
    border-radius: ${AVATAR_RADIUS};
`;

class HeaderAvatar extends Component {
    _onOpenActionSheet = () => {
        const options = ['Logout', 'Cancel'];
        const destructiveButtonIndex = 0;
        this.props.showActionSheetWithOptions({
            options,
            destructiveButtonIndex
        }, buttonIndex => {
            if ( buttonIndex === 0) {
                this.props.client.resetStore();
                return this.props.logout()
            }
        });
    }
    render() {
        if (!this.props.info) {
            return (
                <HeaderButton side='left' disabled>
                    <Loading size="small" />
                </HeaderButton>
            )
        }
        return (
            <HeaderButton side='left' onPress={this._onOpenActionSheet}>
                <Avatar source={{uri: this.props.info.avatar}} />
            </HeaderButton >
        )
    }
}
    

export default withApollo(connect(
    state => ({ info: state.user.info }),
    { logout }
)(connectActionSheet(HeaderAvatar)));