import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyCOXGsnCYKk8nPZ939nGLln0haE9yLn69Q';



// Create Component => produces HTML
class App extends Component {
    constructor(props) {
        super(props);
        this.videoSearch('surfboards');
        this.state = { 
            videos: [],
            selectedVideo:null 
        };
    }
    
    videoSearch(term) {
        YTSearch({key:API_KEY, term:term},(videos) => {
            this.setState({ 
                videos:videos,
                selectedVideo: videos[0]
            });
            
            // this.setState({ videos }); we can use this when the key name is equal to data returned...just for clean up 
        });
    }
    
    render(){
        
        const videoSearch = _.debounce((term)=> {this.videoSearch(term)},300);
        
        return ( 
            <div>
                <SearchBar onSearchTermChange = {videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} /> 
                <VideoList 
                    onVideoSelect = { selectedVideo => this.setState({selectedVideo}) }
                    videos={this.state.videos}
                     
                />
                
            </div> 
        );
    }
}
//passing data like this is called as passing props -->
ReactDOM.render(<App />,document.querySelector('.container')); //creates instance of class