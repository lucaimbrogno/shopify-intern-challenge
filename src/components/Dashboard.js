import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Results from "./Results";
import Nominations from "./Nominations";
import SearchBar from "./SearchBar";

import "../App.css";

const Dashboard = () => {
  const [nominations, setNominations] = useState([]);

  const [results, setResults] = useState({
    movies: [],
    resultsCount: 0,
    searchError: "",
    searchQuery: "",
    page: 1,
  });

  const [isSearchLoading, setIsSearchLoading] = useState(false);

  async function fetchData(loadMore, searchQuery, page) {
    await fetch(
      `https://www.omdbapi.com/?s=${searchQuery}&page=${page}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResults({
          movies: loadMore
            ? data["Search"] && [...results.movies, ...data["Search"]]
            : data["Search"],
          resultsCount: data["totalResults"],
          searchError: data["Error"],
          searchQuery: searchQuery,
          page: page,
        });
      })
      .catch((error) => setResults({ searchError: error }));
  }

  let searchTimer;

  const handleSearchChange = (e) => {
    e.persist();
    setIsSearchLoading(true);
    clearTimeout(searchTimer);

    // search after user has stopped typing query for 1s
    searchTimer = setTimeout(async () => {
      try {
        await fetchData(false, e.target.value, 1);
        setIsSearchLoading(false);
      } catch (error) {
        setResults({ searchError: error });
      }
    }, 1000);
  };

  const handleNomination = (movie) => {
    setNominations([...nominations, movie]);
  };

  const deleteNomination = (movie) => {
    setNominations(nominations.filter((item) => item !== movie));
  };

  const clearNominations = () => {
    setNominations([]);
  };

  const loadMoreResults = async () => {
    try {
      const nextPage = results.page + 1;
      await fetchData(true, results.searchQuery, nextPage);
    } catch (error) {
      setResults({ searchError: error });
      console.log(error);
    }
  };

  return (
    <Container className="dashboard">
      <Row>
        <Col>
          <h1>The Shoppies</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <SearchBar handleSearchChange={handleSearchChange} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Results
            isSearchLoading={isSearchLoading}
            nominations={nominations}
            results={results}
            handleNomination={handleNomination}
            loadMoreResults={loadMoreResults}
          />
        </Col>

        <Col>
          <Nominations
            nominations={nominations}
            deleteNomination={deleteNomination}
            clearNominations={clearNominations}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
