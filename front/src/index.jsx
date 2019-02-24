import React from 'react';
import {render} from 'react-dom';
import css from './style.scss';

console.log(css);

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = { message: 'something' }
	}

	onChange(e) {
		this.setState({message: e.target.value})
	}
	render() {
		return (
			<div>
				<input type="text" className="input is-info" placeholder="Please input text" onChange = { this.onChange.bind(this)} />
				<p>{ this.state.message }</p>
			</div>
		)
	}
}

//require('./style.scss');

render(<App/>, document.getElementById('app'));

