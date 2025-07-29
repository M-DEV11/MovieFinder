import React,{useState,useEffect} from "react";
import NavbarComponent from "../components/Navbar.jsx";
import CardComponent from "../components/Card.jsx";
import { fetchMovieDetails,fetchMovies,fetchPopularMovies } from  "../services/api.js";

const Home = () => {

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(()=>{
    const getMovies = async () => {
      try {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    getMovies();
  },[])

  useEffect(() => {
  const getMovies = async () => {
    try {
      if (searchQuery.trim() === "") {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } else {
        const results = await fetchMovies(searchQuery);
        setMovies(results);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  getMovies();
}, [searchQuery]);


  return(
    <div className="container">
      <NavbarComponent setSearchQuery={setSearchQuery}/>
      <div className="container">
        <div className="row">
          {movies.map((movie) => (
            <div className="col-sm-4" key={movie.id}>
              <CardComponent movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;