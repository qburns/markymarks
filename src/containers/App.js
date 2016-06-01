import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BookmarkApp from './BookmarkApp';
import Header from '../components/header';
import Login from './Login';

export default class App extends Component {
  render() {

      if(!this.props.id) {
          return (
              <div className="app-container">
                  <Header />
                  <Login />
              </div>
          );
      } else {
          return (
              <div className="app-container">
                  <Header />
                  <BookmarkApp />
              </div>
          )
      }

  }
}

App.propTypes = {

};


function mapStateToProps(state) {
    return {
        id: state.userInfo.id,
    };
}




export default connect(mapStateToProps, null)(App);

