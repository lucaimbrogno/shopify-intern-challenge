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
  });

  const [isSearchLoading, setIsSearchLoading] = useState(false);

  async function fetchData(searchQuery) {
    await fetch(
      `https://www.omdbapi.com/?s=${searchQuery}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResults({
          movies: data["Search"],
          resultsCount: data["totalResults"],
          searchError: data["Error"],
          searchQuery: searchQuery,
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
        await fetchData(e.target.value);
        setIsSearchLoading(false);
      } catch (error) {
        setResults({ searchError: error });
      }
    }, 1000);
  };

  const handleNomination = (movie) => {
    setNominations([...nominations, movie]);
  };

  const deleteItem = (movie) => {
    setNominations(nominations.filter((item) => item !== movie));
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
          />
        </Col>

        <Col>
          <Nominations nominations={nominations} deleteItem={deleteItem} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
