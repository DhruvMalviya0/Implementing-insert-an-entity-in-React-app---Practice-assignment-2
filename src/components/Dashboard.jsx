// src/components/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MovieCard from './MovieCard';
import './Dashboard.css'; // Optional: Import CSS for styling

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initial movie data
  const initialMovies = [
    {
      id: 1,
      title: "Inception",
      director: "Christopher Nolan",
      genre: "Sci-Fi",
      releaseYear: 2010,
      synopsis: "A thief who enters the dreams of others to steal secrets from their subconscious.",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      genre: "Drama",
      releaseYear: 1994,
      synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg"
    }
  ];

  // Use state to store movies
  const [movies, setMovies] = useState(initialMovies);

  // Check if a new movie was added (from location state)
  useEffect(() => {
    if (location.state && location.state.newMovie) {
      const newMovie = location.state.newMovie;
      setMovies(prevMovies => [
        ...prevMovies,
        {
          id: prevMovies.length + 1,
          ...newMovie
        }
      ]);
      
      // Clear the location state to prevent duplicate additions on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Movie Collection</h1>
        <button 
          className="add-movie-btn"
          onClick={() => navigate('/add-movie')}
        >
          Add Movie
        </button>
      </div>
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;