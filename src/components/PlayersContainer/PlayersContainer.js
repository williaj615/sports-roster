import React from 'react';
import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';
import './PlayersContainer.scss';
import Player from '../Player/Player';

class PlayersContainer extends React.Component {
state = {
  players: [],
}

getPlayers = () => {
  playerData.getPlayersByUid(authData.getUid())
    .then((players) => {
      this.setState({ players });
    })
    .catch((errOnPlayerContainer) => console.error({ errOnPlayerContainer }));
}

removeSinglePlayer = (playerId) => {
  playerData.removePlayer(playerId)
    .then(() => {
      this.getPlayers();
    })
    .catch((errOnRemovePlayer) => console.error(errOnRemovePlayer));
}

componentDidMount() {
  this.getPlayers();
}

render() {
  return (
    <div id="players-container" className="d-flex flex-row flex-wrap justify-content-around">
      {this.state.players.map((player) => (<Player key={player.id} player={player} removeSinglePlayer={this.removeSinglePlayer}/>))}
    </div>
  );
}
}

export default PlayersContainer;
