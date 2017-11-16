import React from 'react';
import PropTypes from 'prop-types';
var Link = require('react-router-dom').Link;

function PlayerPreview(props) {
	return (
		<div>
			<div className="column">
				<img
					src={props.avatar}
					alt={'Avatar for ' + props.username}
					className="avatar"
				/>
				<h2 className="username">
					@{props.username}
				</h2>
			</div>
			<button className="reset" onClick={props.onReset.bind(null, props.id)}>
				Reset
			</button>
		</div>
	);
}

PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired
};

class PlayerInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		var value = event.target.value;
		this.setState(function() {
			return {
				username: value
			};
		});
	}

	handleSubmit(event) {
		// tells the user agent that if the event goes unhandled,
		// its default action should not be taken
		// as it normally would be.
		event.preventDefault();

		// use Battle component's handleSubmit function
		// which is referenced by 'this.props.onSubmit'
		this.props.onSubmit(this.props.id, this.state.username);
	}

	render() {
		return (
			<form className="column" onSubmit={this.handleSubmit}>
				<label htmlFor="username" className="header">
					{this.props.label}
				</label>
				<input
					type="text"
					id="username"
					placeholder="github username"
					autoComplete="off"
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<button
					className="button"
					type="submit"
					disabled={!this.state.username}>
					Submit
				</button>
			</form>
		);
	}
}

PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
};

class Battle extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			playerOneName: '',
			playerTwoName: '',
			playerOneImage: null,
			playerTwoImage: null
		};

		// whenver we call 'this.handleSubmit'
		// it is a function that is returned with 'this' (in constructor)
		// which is a Home component
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleSubmit(id, username) {
		this.setState(function() {
			var newState = {};
			newState[id + 'Name'] = username;
			newState[id + 'Image'] =
				'https://github.com/' + username + '.png?size=200';
			return newState;
		});
	}

	handleReset(id) {
		/*
		this.setState(function() {
			var resetState = {};
			resetState[id + 'Name'] = '';
			resetState[id + 'Image'] = null;
			return resetState;
		});
		*/
		this.setState(() => {
			var resetState = {};
			resetState[id + 'Name'] = '';
			resetState[id + 'Image'] = null;
			return resetState;
		});
	}

	render() {
		var match = this.props.match;
		var playerOneName = this.state.playerOneName;
		var playerTwoName = this.state.playerTwoName;
		var playerOneImage = this.state.playerOneImage;
		var playerTwoImage = this.state.playerTwoImage;
		return (
			<div>
				<div className="row">
					{/* saying if !playerOneName is true, then insert a component */}
					{!playerOneName
						? <PlayerInput
								id="playerOne"
								label="Player One"
								onSubmit={this.handleSubmit}
							/>
						: <PlayerPreview
								avatar={playerOneImage}
								username={playerOneName}
								onReset={this.handleReset}
								id="playerOne"
							/>}
					{!playerTwoName
						? <PlayerInput
								id="playerTwo"
								label="Player Two"
								onSubmit={this.handleSubmit}
							/>
						: <PlayerPreview
								avatar={playerTwoImage}
								username={playerTwoName}
								onReset={this.handleReset}
								id="playerTwo"
							/>}
				</div>
				{playerOneName &&
					playerTwoName &&
					<Link
						className="button"
						to={{
							pathname: match.url + '/results',
							search:
								'?playerOneName=' +
								playerOneName +
								'&playerTwoName=' +
								playerTwoName
						}}>
						Batle
					</Link>}
			</div>
		);
	}
}

export default Battle;
