import React, {Component} from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';
import {Header, Button, Spinner, CardSection} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {loggedIn: null};
  componentDidMount() {
    try {
      firebase.initializeApp({
        apiKey: 'AIzaSyCX3-5l96NX6F7etCctks9hjqPwvhJyQp8',
        authDomain: 'authentication-29454.firebaseapp.com',
        databaseURL: 'https://authentication-29454.firebaseio.com',
        projectId: 'authentication-29454',
        storageBucket: 'authentication-29454.appspot.com',
        messagingSenderId: '639916596000',
        appId: '1:639916596000:web:8f27bc9bd670e3879ed545',
        measurementId: 'G-2SG24QYHYS',
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({loggedIn: true});
        } else {
          this.setState({loggedIn: false});
        }
      });
    } catch (err) {
      // we skip the "already exists" message which is
      // not an actual error when we're hot-reloading
      if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack);
      }
    }
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

// const styles = {
//   logoutButton: {
//     borderRightColor: 'red',
//     borderStyle: 'solid',
//     paddingBottom: 50,
//     height: 200,
//     marginBottom: 50,
//   },
// };

export default App;
