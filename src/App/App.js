import React from 'react';
import firebase from 'firebase/app';
import MyNavBar from '../components/MyNavBar/MyNavBar';
import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import PlayersContainer from '../components/PlayersContainer/PlayersContainer';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <MyNavBar authed={authed} />
        {/* if they are authenticated, load the team roster */}
        {/* else show login button */}
        {
          (authed) ? (<PlayersContainer />) : (<Auth />)
        }
      </div>
    );
  }
}

export default App;
