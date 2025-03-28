import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const MovieDetailsCard = ({ movieTitle }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieTitle) return;

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${movieTitle}&apikey=fed4d426`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError("Movie not found");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieTitle]);

  if (loading) return <p className="text-gray-400 text-center">Loading...</p>;
  if (error) return <p className="text-red-400 text-center">{error}</p>;
  if (!movie) return <p className="text-gray-400 text-center">No movie data available</p>;

  return (
    <div className="max-w-3xl bg-gray-900 text-white rounded-xl shadow-lg p-6 mx-auto mt-6">
      <div className="flex flex-col md:flex-row">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
          alt={movie.Title}
          className="w-full md:w-1/3 rounded-lg shadow-md"
        />
        <div className="md:ml-6 flex-1">
          <h2 className="text-2xl font-bold text-cyan-400">{movie.Title} ({movie.Year})</h2>
          <p className="text-sm text-gray-400 mt-1">{movie.Rated} | {movie.Runtime} | {movie.Genre}</p>
          <p className="text-sm text-gray-400">Directed by: <span className="text-white">{movie.Director}</span></p>
          <p className="text-sm text-gray-400">Written by: <span className="text-white">{movie.Writer}</span></p>
          <p className="text-sm text-gray-400">Starring: <span className="text-white">{movie.Actors}</span></p>
          <p className="mt-3">{movie.Plot}</p>

          <div className="mt-3">
            <p><strong>Language:</strong> {movie.Language}</p>
            <p><strong>Country:</strong> {movie.Country}</p>
            <p><strong>Awards:</strong> {movie.Awards}</p>
            <p><strong>Box Office:</strong> {movie.BoxOffice}</p>
          </div>
          <div className="mt-3 flex items-center">
            <FaStar className="text-yellow-400 text-xl" />
            <p className="ml-2 text-lg font-semibold">{movie.imdbRating} / 10</p>
            <p className="ml-2 text-gray-400">({movie.imdbVotes} votes)</p>
          </div>

          <div className="mt-3">
            <h3 className="font-semibold text-lg">Ratings:</h3>
            {movie.Ratings.map((rating, index) => (
              <p key={index} className="text-sm">
                <strong>{rating.Source}:</strong> {rating.Value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
