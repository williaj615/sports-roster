import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';

class PlayerForm extends React.Component {
  static propTypes = {
    addPlayer: PropTypes.func,
    setCancelAdd: PropTypes.func,
  }

  state = {
    playerName: '',
    playerImageUrl: '',
    playerPosition: '',

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
      <button className="btn btn-secondary" onClick={this.savePlayerEvent}>Save Player</button>
      <button className="btn btn-danger" onClick={this.setCancelAdd}>Cancel</button>
    </form>
    );
  }
}

export default PlayerForm;
