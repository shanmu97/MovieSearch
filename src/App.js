import Input from "./Components/Input";
import Button from "./Components/Button";
import "./App.css";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaStar } from "react-icons/fa";

function App() {
  const inputRef = useRef(null);
  const yearRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const API_KEY = "fed4d426";

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSubmit = async (e, page = 1) => {
    e.preventDefault();
    const title = inputRef?.current?.value.trim();
    const year = yearRef?.current?.value.trim();
    if (!title) return;

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${title}&y=${year}&apikey=${API_KEY}&page=${page}`
      );
      if (response.data.Search) {
        const detailedMovies = await Promise.all(
          response.data.Search.map(async (movie) => {
            const details = await axios.get(
              `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
            );
            return details.data;
          })
        );
        setMovies(detailedMovies);
        setTotalResults(parseInt(response.data.totalResults, 10));
        setCurrentPage(page);
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.imdbID === movie.imdbID)
        ? prev.filter((fav) => fav.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white px-4 w-full">
      <div className="fixed top-0 left-0 w-full bg-gray-900 z-50 shadow-md p-2">
        <Button
          onClick={() => setShowFavorites(!showFavorites)}
          className="w-full bg-yellow-500 px-4 py-2 text-center shadow-md hover:shadow-lg transition"
        >
          {showFavorites ? "Show All Movies" : "Show Favorites"}
        </Button>
      </div>

      <div className="h-16"></div>

      <motion.h1
        className="text-2xl md:text-3xl font-extrabold mb-6 text-cyan-400 my-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Movies Search App
      </motion.h1>

      <motion.form
        onSubmit={(e) => handleSubmit(e, 1)}
        className="flex flex-col md:flex-row gap-3 bg-gray-800 p-4 rounded-xl shadow-lg w-full max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Input
          type="text"
          ref={inputRef}
          placeholder="Enter movie title..."
          className="border border-cyan-500 bg-gray-700 text-white px-4 py-2 rounded-lg outline-none w-full"
        />
        <Input
          type="text"
          ref={yearRef}
          placeholder="Enter year (optional)..."
          className="border border-cyan-500 bg-gray-700 text-white px-4 py-2 rounded-lg outline-none w-full"
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition w-full"
        >
          Search
        </Button>
      </motion.form>

      <div className="mt-6 w-full max-w-5xl">
        <MovieGrid movies={showFavorites ? favorites : movies} toggleFavorite={toggleFavorite} favorites={favorites} />
      </div>

      {movies.length > 0 && !showFavorites && (
        <div className="flex flex-col md:flex-row gap-4 mt-6 w-full justify-center">
          <Button
            onClick={(e) => handleSubmit(e, currentPage - 1)}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={(e) => handleSubmit(e, currentPage + 1)}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition disabled:opacity-50"
            disabled={currentPage * 10 >= totalResults}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

const MovieGrid = ({ movies, toggleFavorite, favorites }) => {
  return movies.length > 0 ? (
    <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      {movies.map((movie) => {
        const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
        return (
          <motion.div key={movie.imdbID} className="bg-gray-800 rounded-lg p-4 shadow-lg flex flex-col items-center relative transition-transform hover:scale-105" whileHover={{ scale: 1.05 }}>
            <FaStar className={`absolute top-2 right-2 cursor-pointer text-2xl transition ${isFavorite ? "text-yellow-400" : "text-gray-400"}`} onClick={() => toggleFavorite(movie)} />
            <img src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"} alt={movie.Title} className="w-full h-64 object-cover rounded-lg" />
            <p className="mt-2 text-center font-semibold text-lg">{movie.Title}</p>
            <p className="text-sm text-gray-400">{movie.Year}</p>
            <p className="text-sm text-gray-400">Genre: {movie.Genre}</p>
          </motion.div>
        );
      })}
    </motion.div>
  ) : (
    <p className="text-gray-400 mt-4 text-center">No results found</p>
  );
};

export default App;
