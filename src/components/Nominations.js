import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const Nominations = ({ nominations, deleteNomination, clearNominations }) => (
  <div className="box title-box">
    <h4 className="title">Your Nominations </h4>
    {nominations.length > 0 && (
      <Button onClick={clearNominations}>Clear Nominations</Button>
    )}
    {nominations.length >= 5 && (
      <div className="banner banner-green">{`You have ${nominations.length} nominations!`}</div>
    )}
    <div className="movie-list">
      {nominations?.map((movie) => (
        <div key={movie.imdbID} className="list-item">
          <div className="movie-poster">
            <img alt="Poster" src={movie.Poster} />
          </div>
          <div className="movie-details">
            {`${movie.Title} `}
            <br />
            <sub>{`(${movie.Year})`}</sub>
          </div>
          <div className="movie-controls">
            <Button
              className="controls-button"
              onClick={() => deleteNomination(movie)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

Nominations.propTypes = {
  nominations: PropTypes.array,
  deleteNomination: PropTypes.func,
  clearNominations: PropTypes.func,
};

export default Nominations;
