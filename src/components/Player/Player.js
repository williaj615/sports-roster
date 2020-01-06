import React from 'react';
import PropTypes from 'prop-types';
import playerShape from '../../helpers/propz/playerShape';
import './Player.scss';

class Player extends React.Component {
static propTypes = {
  player: playerShape.playerShape,
  removeSinglePlayer: PropTypes.func,
}

removePlayerEvent = (e) => {
  e.preventDefault();
  const { removeSinglePlayer, player } = this.props;
  removeSinglePlayer(player.id);
}

render() {
  const { player } = this.props;
  return (
    <div className="card player-card col-3 m-3">
      <img className="player-pic" alt="player-pic" src={player.imageUrl}/>
      <h3>{player.name}</h3>
      <p>{player.position}</p>
      <button className="delete-button btn btn-danger mb-2" onClick={this.removePlayerEvent}>Remove Player</button>
      <button className="edit-button btn btn-info">Edit Player</button>
    </div>
  );
}
}

export default Player;
