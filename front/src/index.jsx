import React from 'react';
import { render } from 'react-dom';
import firebase from './firebase'
import axios from 'axios'

class App extends React.Component {

	state = {
		user: null,
		response: null,
		error: null
	}

	componentDidMount = () => {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({ user: user })
		})
	}

	login = () => {
		const provider = new firebase.auth.GithubAuthProvider()
		firebase.auth().signInWithPopup(provider).then(res => {
			console.log("Success login")
		})
	}

	logout = () => {
		firebase.auth().signOut();
	}

	callPrivate = () => {
		if (this.state.user == null) {
			return
		}
		let user = this.state.user
		user.getIdToken().then(token => {
			this.setState({ loading: true });
			let axiosConfig = {
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					'Authorization': `Bearer ${token}`
				}
			};
			return axios
				.get(
					`https://dokushokai.appspot.com/private`, axiosConfig
				)
				.then(result => {
					this.setState({
						response: result.data
					});
				})
				.catch(error => {
					console.error("error: ", error);
					this.setState({
						error: error
					})
				});
		})
	};

	render() {
		return (
			<div className="App">
				<p className="App-intro">
					UID: {this.state.user && this.state.user.uid}
				</p>

				{this.state.user ? (
					<button onClick={this.logout}>GitHub Logout</button>
				) : (
						<button onClick={this.login}>GitHub Login</button>
					)}


				{this.state.user ? (
					<p>Login</p>
				) : (
						<p>NOT Login</p>
					)}

				<p>Response:{this.state.response}</p>

				<button onClick={this.callPrivate}>Call API</button>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));

