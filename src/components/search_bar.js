import React, { Component } from 'react';

// use this syntax for impure functions
class SearchBar extends Component {

	constructor(props) {
		super(props);

		this.state = { term: '' };
	}

	render() {
		// this.state.term = 'laksdjf' // BAD
		// controlled component: component changes when state changes
		return (
			<div className="search-bar">
				<input
					value={ this.state.term }
					// refactored onChange event
					onChange={(event) => this.onInputChange(event.target.value)} />
			</div>
		);
	}

	onInputChange(term) {
		this.setState({term});
		this.props.onSearchTermChange(term);
	}

	// all browser events are handled with the event object like so...
	// onInputChange(event) {
	// 	console.log('event: ', event.target.value);
	// }
}

// use this syntax for pure components
// const SearchBar = () => {
// 	return (
// 		<input />
// 	);
// };

export default SearchBar;
