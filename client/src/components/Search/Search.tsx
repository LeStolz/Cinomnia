import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { MovieCard } from "../MovieCard/MovieCard";
import { api } from "../../utils/api";
import { Film } from "../../configs/Model";
import "./Search.scss";

interface MovieTitlesProps {
  titles: string[];
}

export default function MovieTitles({ titles }: MovieTitlesProps) {
  return (
    <Container fluid className="p-5">
      <h3 className="pt-5">
        Explore Titles Related To: {titles.length} Result
      </h3>
      <Container fluid>
        {titles.map((title, index) => (
          <a
            key={title}
            href={`#${index}`}
            className="titles text-decoration-none fs-5"
          >
            {title}
          </a>
        ))}
      </Container>
    </Container>
  );
}

export function Search() {
  const location = useLocation();
  const searchKey = location.pathname.split("/search/")[1];
  const [searchResults, setSearchResults] = useState<Film[]>([]);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const response = await api.get(`/films/${searchKey}`);
        const updatedFilmData = await Promise.all(
          response.data.map(async (filmData: Film) => {
            const genreIds = filmData.genres.map((genre) => genre.id);
            const genreResponses = await Promise.all(
              genreIds.map((genreId) => api.get(`/genres/${genreId}`))
            );
            const genres = genreResponses.map(
              (genreResponse) => genreResponse.data[0]
            );

            filmData.genres = genres;
            return filmData;
          })
        );
        setSearchResults(updatedFilmData);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }

    fetchSearchResults();
  }, [searchKey]);

  return (
    <Container className="home p-0">
      <MovieTitles titles={searchResults.map((movie: Film) => movie.title)} />
      <Row
        xs={1}
        sm={2}
        md={4}
        lg={5}
        className="justify-content-start ms-5 me-5"
      >
        {searchResults.map((movie: Film) => (
          <Col key={movie._id} className="ps-1 pe-1 mb-5">
            <MovieCard movieData={movie} className="" />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
