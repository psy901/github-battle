var axios = require('axios');

module.exports = {
	fetchPopularRepos: function(language) {

		// window.encodeURI transforms the string uri to machinary uri
		var encodedURI = window.encodeURI(
			'https://api.github.com/search/repositories?q=stars:>1+language:' +
				language +
				'&sort=stars&order=desc&type=Repositories'
		);

		// axios.get() --> then ... 
		// 'then' is executed when axios.get() is finished
		return axios.get(encodedURI)
			.then(function(response) {		// getting back a response
				return response.data.items;		// get data from the response
			});
	}
}
