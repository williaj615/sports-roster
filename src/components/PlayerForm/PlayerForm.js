import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';
import playerShape from '../../helpers/propz/playerShape';

class PlayerForm extends React.Component {
  static propTypes = {
    addPlayer: PropTypes.func,
    setCancelAdd: PropTypes.func,
    playerToUpdate: playerShape.playerShape,
    editMode: PropTypes.bool,
    updatePlayer: PropTypes.func,
  }

  state = {
    playerName: '',
    playerImageUrl: '',
    playerPosition: '',

  }

  componentDidMount() {
    const { playerToUpdate, editMode } = this.props;
    if (editMode) {
      this.setState({ playerImageUrl: playerToUpdate.imageUrl, playerName: playerToUpdate.name, playerPosition: playerToUpdate.position });
    }
  }

  savePlayerEvent = (e) => {
    const { addPlayer } = this.props;

    e.preventDefault();
    const newPlayer = {
      name: this.state.playerName,
      imageUrl: this.state.playerImageUrl,
      position: this.state.playerPosition,
      uid: authData.getUid(),
    };
    addPlayer(newPlayer);
    this.setState({ playerName: '', playerImageUrl: '', playerPosition: '' });
  }

  updatePlayerEvent = (e) => {
    e.preventDefault();
    const { updatePlayer, playerToUpdate } = this.props;
    const updatedPlayer = {
      name: this.state.playerName,
      position: this.state.playerPosition,
      imageUrl: this.state.playerImageUrl,
      uid: playerToUpdate.uid,
    };
    updatePlayer(playerToUpdate.id, updatedPlayer);
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ playerName: e.target.value });
  }

  imageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ playerImageUrl: e.target.value });
  }

  positionChange = (e) => {
    e.preventDefault();
    this.setState({ playerPosition: e.target.value });
  }

  render() {
    const { editMode } = this.props;
    return (
      <form className='col-6 offset-3 PlayerForm'>
      <div className="form-group">
        <label htmlFor="player-name">Player Name:</label>
        <input
          type="text"
          className="form-control"
          id="player-name"
          placeholder="Enter player name"
          value={this.state.playerName}
          onChange={this.nameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="player-position">Player Position:</label>
        <input
          type="text"
          className="form-control"
          id="player-position"
          placeholder="Enter player position"
          value={this.state.playerPosition}
          onChange={this.positionChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="player-image">Image URL:</label>
        <input
          type="text"
          className="form-control"
          id="player-image"
          placeholder="Enter player image url"
          value={this.state.playerImageUrl}
          onChange={this.imageUrlChange}
        />
      </div>
      {}
      {
          (editMode) ? (<button className="btn btn-warning m-2" onClick={this.updatePlayerEvent}>Update Player</button>)
            : (<button className="btn btn-warning m-2" onClick={this.savePlayerEvent}>Save Player</button>)
        }
        <button className="btn btn-danger m-2" onClick={this.setCancelAdd}>Cancel</button>
    </form>
    );
  }
}

export default PlayerForm;
