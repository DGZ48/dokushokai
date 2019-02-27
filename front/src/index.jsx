import React from 'react';
import { render } from 'react-dom';
import firebase from './firebase'

class App extends React.Component {

	state = {
		user: null
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({ user })
		})
	}

	login() {
		const provider = new firebase.auth.GoogleAuthProvider()
		firebase.auth().signInWithRedirect(provider)
	}

	logout() {
		firebase.auth().signOut()
	}

	constructor(props) {
		super(props)
		this.state = { message: 'something' }
	}

	render() {
		return (
			<div className="App">
				<p className="App-intro">
					UID: {this.state.user && this.state.user.uid}
				</p>

				{this.state.user ? (
					<button onClick={this.logout}>Google Logout</button>
				) : (
						<button onClick={this.login}>Google Login</button>
					)}
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));

