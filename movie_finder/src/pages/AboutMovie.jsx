import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/Navbar";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/api";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { useFirebase } from "../context/Firebase";

const AboutMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const firebase = useFirebase();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(id);
        setMovie(details);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    getMovieDetails();
  }, [id]);

  const handleWatchList = () => {
    if(!firebase.isLoggedIn) {
      alert("Please log in to add movies to your watchlist.");
      return;
    }
    else{
      firebase.addToWatchlist(movie);
      alert("Movie added to watchlist successfully!");
      console.log("Movie added to watchlist:", movie);
    }
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="container mt-4">
      <NavbarComponent />
      {!movie ? (
        <h1>Loading...</h1>
      ) : (
        <Card className="p-4 shadow-lg">
          <Card.Img
            variant="top"
            src={`${imageBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            style={{ maxWidth: "300px", margin: "0 auto" }}
          />
          <Card.Body>
            <Card.Title className="text-center mb-3">{movie.title}</Card.Title>
            <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> ⭐ {movie.vote_average} / 10</p>
            <Card.Text className="mt-3">{movie.overview}</Card.Text>
            <Button variant="primary" onClick={handleWatchList}>Add to Watchlist</Button>

            {movie.trailerKey ? (
              <div className="mt-4">
                <h5>Watch Trailer:</h5>
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`https://www.youtube.com/embed/${movie.trailerKey}`}
                    title="Movie Trailer"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <p>No trailer available.</p>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default AboutMovie;
