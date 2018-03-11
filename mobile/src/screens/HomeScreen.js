import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo'
import { ActivityIndicator, FlatList } from 'react-native';

import FeedCard from '../components/FeedCard/FeedCard';
import GET_TWEETS_QUERY from '../graphql/queries/getTweets';
import getTweets from '../graphql/queries/getTweets';

const Root = styled.View`
    flex: 1;
    padding-top: 5px;
`;

const List =  styled.ScrollView`
`;

class HomeScreen extends Component {
    _renderItem = ({ item }) => <FeedCard {...item} /> 
    render () {
        const { data } = this.props;
        if (data.loading) {
            return (
                <Root>
                    <ActivityIndicator size='small' />
               </Root>
            )
        }
        return (
            <Root>
                <FlatList
                    contentContainerStyle = {{ alignSelf: 'stretch' }}
                    data={data.getTweets}
                    keyExtractor={item => item._id}
                    renderItem={this._renderItem}
                />
            </Root>
        );
    }
}

export default graphql(GET_TWEETS_QUERY)(HomeScreen);