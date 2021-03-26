import React from 'react';
import Button from 'react-bootstrap/Button';

class MovieRow extends React.Component {

  constructor(props) {
    super(props)
  }

  viewMovie() {
    window.location.href = "http://www.themoviedb.org/movie/" + this.props.movie.id
  }

  render() {
    let image;
    if (this.props.movie.poster_src != null) {
      image = <img alt="poster" src={this.props.movie.poster_src}/>
    } else {
      image = <p>No poster available</p>
    }
    return(
    <table key={this.props.movie.id} style={{ display: "block", padding: 20}}>
      <tbody>
        <tr>
          <td>
          {image}
          </td>
          <td style={{paddingLeft: 20}}>
            <h3>{this.props.movie.title}</h3>
            <p>{this.props.movie.overview}</p>
            <Button variant="primary" onClick={this.viewMovie.bind(this)}>View</Button>{' '}
          </td>
        </tr>
      </tbody>
    </table>
    );
  }
}

export default MovieRow;