import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.performSearch("avenger");
  }

  searchChangeHandler(event) {
    const searchTerm = event.target.value
    this.performSearch(searchTerm)
  }

  performSearch(searchTerm) {
    const urlString = "https://api.themoviedb.org/3/search/movie?&api_key=10055208341350f9b1b3acb5972dbc53&language=en-US&page=1&include_adult=false&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
          const results = searchResults.results
          var movieRows = []
          if (results.length == 0) {
            this.setState({rows:  <h3>No movies found</h3>})
          } else {
            results.forEach((movie) => {
              if (movie.poster_path == null) {
                movie.poster_src = null
              } else {
                movie.poster_src = "https://image.tmdb.org/t/p/w185/" + movie.poster_path;
              }
              const movieRow = <MovieRow key={movie.id} movie={movie}/>
              movieRows.push(movieRow)
            })
  
            this.setState({rows: movieRows})
          }
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }
  
  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="50" src="db-image.png"/>
              </td>
              <td width="8"/>
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input onChange={this.searchChangeHandler.bind(this)} className="searchBar" placeholder="Enter search term"/>
        {this.state.rows}

      </div>
    );
  }
}

export default App;
