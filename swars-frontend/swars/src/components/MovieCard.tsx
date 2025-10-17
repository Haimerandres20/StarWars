import React from 'react';

interface MovieCardProps {
  titulo: string;
  director: string;
  fechaEstreno: string;
  planetas: string[];
  posterUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ titulo, director, fechaEstreno, planetas, posterUrl }) => (
  <div className="movie-card-pro">
    <div className="movie-poster-container">
      <img
        src={posterUrl}
        alt={`Poster profesional de la película ${titulo}`}
        className="movie-poster-img"
      />
      <div className="movie-poster-overlay">
        <h2 className="movie-title-pro">{titulo}</h2>
        <div className="movie-info-pro"><span>🎬 Director:</span> {director}</div>
        <div className="movie-info-pro"><span>📅 Estreno:</span> {fechaEstreno}</div>
        <div className="movie-info-pro"><span>🪐 Planetas:</span> {planetas.join(', ') || 'N/A'}</div>
      </div>
    </div>
  </div>
);

export default MovieCard;
