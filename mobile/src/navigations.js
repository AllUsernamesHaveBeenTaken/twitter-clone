import React,  { Component } from 'react';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
  } from 'react-navigation-redux-helpers';
  
import HomeScreen from './screens/HomeScreen';

const AppMainNav = StackNavigator({
    Home: {
        screen: HomeScreen,
    },
});

const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
  );
  
const addListener = createReduxBoundAddListener("root");

class AppNavigator extends Component {
  render() {
    const nav = addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener  
    })
    return <AppMainNav navigation={nav} />
  }
}

export default connect(state => ({
    nav: state.nav,
}))(AppNavigator);

export const router = AppMainNav.router;

 