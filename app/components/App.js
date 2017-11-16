import React from 'react';
import ReactDOM from 'react-dom';
import Popular from './Popular';
import Popular2 from './Popular2';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';

// Router
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className="container">
					<Nav />

					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/battle" component={Battle} />
						<Route path="/battle/results" component={Results}></Route>
						<Route path="/popular" component={Popular} />
						<Route render={function() {
							return <h1>Not Found</h1>
						}} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
