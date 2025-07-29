import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase.jsx";
import NavbarComponent from "../components/Navbar.jsx";
import { fetchMovieDetails } from "../services/api";
import CardComponent from "../components/Card.jsx";

const Watchlist = () => {

  const firebase = useFirebase();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      try {
        const movieList = await firebase.fetchWatchlist();
        if (!movieList || movieList.length === 0) {
          setWatchlist([]);
          return;
        }
        const detailsList = [];
        for (const element of movieList) {
          // If element is just an id, fetch details; if already a movie object, use as is
          let details = element;
          if (!element.title) {
            try {
              details = await fetchMovieDetails(element.id || element);
            } catch (error) {
              console.error("Error fetching movie details:", error);
              continue;
            }
          }
          detailsList.push(details);
        }
        setWatchlist(detailsList);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };
    fetchWatchlistMovies();
  }, [firebase]);

  return(
    <div>
      <NavbarComponent />
      {!firebase.isLoggedIn ? (
        <h1 className="text-center mt-5">Please log in to view your watchlist.</h1>
      ) : (
        <div className="container">
          <div className="row">
            {watchlist.map((movie) => (
              <div className="col-sm-4" key={movie.id}>
                <CardComponent movie={movie} />
              </div>
            ))}
          </div>
        </div>
      )}
    
    </div>
  )
}

export default Watchlist;