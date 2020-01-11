import React from 'react';
import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';
import './PlayersContainer.scss';
import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

class PlayersContainer extends React.Component {
state = {
  players: [],
  displayPlayerForm: false,
  editMode: false,
  playerToUpdate: {},
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

addAPlayer = (newPlayer) => {
  playerData.savePlayer(newPlayer)
    .then(() => {
      this.getPlayers();
      this.setState({ displayPlayerForm: false });
    })
    .catch((errOnSavePlayer) => console.error(errOnSavePlayer));
}

updatePlayer = (playerId, updatedPlayer) => {
  playerData.updatePlayer(playerId, updatedPlayer)
    .then(() => {
      this.getPlayers();
      this.setState({ editMode: false, displayPlayerForm: false });
    })
    .catch((errFromUpdatePlayer) => console.error(errFromUpdatePlayer));
}

setDisplayPlayerForm = () => {
  this.setState({ displayPlayerForm: true });
}

setCancelAdd = () => {
  this.setState({ displayPlayerForm: false });
}

setEditMode = (editMode) => {
  this.setState({ editMode, displayPlayerForm: true });
}

setPlayerToUpdate = (player) => {
  this.setState({ playerToUpdate: player });
}

componentDidMount() {
  this.getPlayers();
}

render() {
  const { editMode, playerToUpdate } = this.state;
  return (
    <div>
      <button className="btn btn-secondary m-3" onClick={this.setDisplayPlayerForm}>Add Roster Player</button>
      { this.state.displayPlayerForm && (<PlayerForm addPlayer={this.addAPlayer} setCancelAdd={this.setCancelAdd} editMode={editMode} playerToUpdate={playerToUpdate} updatePlayer={this.updatePlayer}/>)}
      <div id="players-container" className="d-flex flex-row flex-wrap justify-content-around">
        {this.state.players.map((player) => (<Player key={player.id} player={player} removeSinglePlayer={this.removeSinglePlayer} setEditMode={this.setEditMode} setPlayerToUpdate={this.setPlayerToUpdate} />))}
      </div>
    </div>
  );
}
}

export default PlayersContainer;
