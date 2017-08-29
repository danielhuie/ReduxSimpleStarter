import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDWy7C-SLdX6P5TV7j-6YFzFtXPWbhmQjA';

// class based component is for impure functions (data changing over time and the use of state)
// funcational component is for pure functions (simple component that takes some number of properties and returns static jsx, lightweight and fast)
class App extends Component {
	// this runs first when the component loads
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null,
		};

		// refactored youtube search into its own method
		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos,
				selectedVideo: videos[0],
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => {
			this.videoSearch(term)
		}, 300);

		return (
			// passing down videoSearch as a prop
			// calling const videoSearch will only make YT api call every 300 MS
			// react callbacks are important for how we pass data down from parent to child
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList
				// we pass the state as a property to VideoList called 'onVideoSelect'
				// this is how we will update state via props
					onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
					videos={this.state.videos} />
			</div>
		);
	}
}

// we pass a component instance (<App />) instead of component class (App) so that the
// component can render
// second param is the target element for which the instance is rendered to

ReactDOM.render(
	<App />
	, document.querySelector('.container'));
