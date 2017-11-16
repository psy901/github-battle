import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import api from '../utils/api';

function SelectLanguage(props) {
	var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
	return (
		<ul className="languages">
			{languages.map(lang => {
				return (
					<li
						key={lang}
						style={
							lang === props.selectedLanguage ? { color: '#d0021b' } : null
						}
						onClick={props.onSelect.bind(null, lang)}>
						{' '}{lang}
					</li>
				);
			})}
		</ul>
	);
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};

function RepoGrid(props) {
	return (
		<ul className="popular-list">
			{props.repos.map(function(repo, index) {
				return (
					<li key={repo.name} className="popular-item">
						<div className="popular-rank">
							#{index + 1}
						</div>
						<ul className="space-list-items">
							<li>
								<img
									src={repo.owner.avatar_url}
									alt={'Avatar for' + repo.owner.login}
									className="avatar"
								/>
							</li>
							<li>
								<a href={repo.html_url}>
									{repo.name}
								</a>
							</li>
							<li>
								@{repo.owner.login}
							</li>
							<li>
								{repo.stargazers_count} stars
							</li>
						</ul>
					</li>
				);
			})}
		</ul>
	);
}

class Popular2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null
		};

		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang) {
		// console.log(lang);
		this.setState({
			selectedLanguage: lang,
			repos: null
		});

		// getting data from using API
		api.fetchPopularRepos(lang).then(repos => {
			this.setState({
				repos: repos
			});
		});
	}

	render() {
		return (
			<div>
				<SelectLanguage
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{ this.state.repos === null
					? <p>Loading</p>
					: <RepoGrid repos={this.state.repos} />}
			</div>
		);
	}
}

export default Popular2;
