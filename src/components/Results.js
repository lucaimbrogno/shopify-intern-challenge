import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const Results = ({
  isSearchLoading,
  nominations,
  results,
  handleNomination,
}) => (
  <div className="box">
    <h4 className="title">{`Results for "${results.searchQuery}"`} </h4>
    {results.searchError && (
      <div className="banner banner-red">{results.searchError}</div>
    )}
    {results.movies?.length > 0 && (
      <div className="list-info">{`Total Results: ${results.resultsCount}. Displaying top 10 results`}</div>
    )}
    {isSearchLoading && <div className="list-info">Loading Results...</div>}
    <div className="movie-list">
      {results.movies?.map((movie) => (
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
            {!nominations.some(
              (nominationMovie) => nominationMovie.imdbID === movie.imdbID
            ) && (
              <Button
                className="controls-button"
                onClick={() => handleNomination(movie)}
              >
                Nominate
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

Results.propTypes = {
  isSearchLoading: PropTypes.bool,
  nominations: PropTypes.array,
  results: PropTypes.object,
  handleNomination: PropTypes.func,
};

export default Results;
