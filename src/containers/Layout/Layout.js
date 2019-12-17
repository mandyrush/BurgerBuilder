import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    closeSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    };

    toggleHamburgerHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    };

    render() {
        return (
            <Aux>
                <Toolbar 
                    toggleHamburger={this.toggleHamburgerHandler} 
                    isAuth={this.props.isAuth} />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    close={this.closeSideDrawerHandler} 
                    isAuth={this.props.isAuth} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
}; 

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);