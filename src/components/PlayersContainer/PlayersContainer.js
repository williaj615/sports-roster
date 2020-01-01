import React from 'react';
import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';
import './PlayersContainer.scss';

class PlayersContainer extends React.Component {
state={
  players: [],
}

componentDidMount() {
  playerData.getPlayersByUid(authData.getUid())
    .then((players) => {
      this.setState({ players });
    })
    .catch((errOnPlayerContainer) => console.error({ errOnPlayerContainer }));
}

render() {
  return (
    <div id="players-container" className="d-flex flex-row flex-wrap justify-content-around">
      {this.state.players.map((player) => <div className="card player-card">
        <img alt="player-pic" src={player.imageUrl}/>
        <h3>{player.name}</h3>
        <p>{player.position}</p>
      </div>)}
    </div>
  );
}
}

export default PlayersContainer;
