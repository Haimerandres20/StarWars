
import React, { useEffect, useState } from 'react';
import posterDefault from '../../assets/s.jpg';
import MovieCard from '../../components/MovieCard';
import { graphqlQuery } from '../../services/graphqlService';
import MOVIES_QUERY from '../../queries/moviesQuery';
import './Movies.css';
import Pagination from '../../components/Pagination';

interface Pelicula {
  id: string;
  titulo: string;
  director: string;
  fechaEstreno: string;
  planetas: {
    edges: { node: { nombre: string } }[];
  };
}


const Movies: React.FC = () => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageInfo, setPageInfo] = useState<{ hasNextPage: boolean; endCursor: string | null }>({ hasNextPage: false, endCursor: null });
  const [after, setAfter] = useState<string | null>(null);
  const [pageStack, setPageStack] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  useEffect(() => {
    const fetchPeliculas = async () => {
      setLoading(true);
      setError(null);
      try {
        const variables: any = { first: PAGE_SIZE };
        if (after) variables.after = after;
        const response = await graphqlQuery(MOVIES_QUERY, variables);
        const edges = response?.data?.allPeliculas?.edges || [];
        setPeliculas(edges.map((edge: any) => edge.node));
        setPageInfo(response?.data?.allPeliculas?.pageInfo || { hasNextPage: false, endCursor: null });
      } catch (err: any) {
        setError('Error al cargar las películas');
      } finally {
        setLoading(false);
      }
    };
    fetchPeliculas();
  }, [after]);

  const handleNext = () => {
    if (pageInfo.hasNextPage && pageInfo.endCursor) {
      setPageStack([...pageStack, after || '']);
      setAfter(pageInfo.endCursor);
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (pageStack.length > 0) {
      const prevStack = [...pageStack];
      const prevCursor = prevStack.pop();
      setPageStack(prevStack);
      setAfter(prevCursor || null);
      setPage(page - 1);
    }
  };

  return (
    <section className="movies-page-view">
      <header className="movies-header">
        <h1>🎬 Ver Películas</h1>
        <p className="movies-subtitle">Explora la saga de Star Wars y sus planetas destacados</p>
      </header>
      {loading && <div className="loading">Cargando películas...</div>}
      {error && <div className="error-message">{error}</div>}
      <div className="movies-grid">
        {peliculas.map((movie) => (
          <MovieCard
            key={movie.id}
            titulo={movie.titulo}
            director={movie.director}
            fechaEstreno={movie.fechaEstreno}
            planetas={movie.planetas.edges.map((p) => p.node.nombre)}
            posterUrl={posterDefault}
          />
        ))}
      </div>
      <Pagination
        page={page}
        onPrev={handlePrev}
        onNext={handleNext}
        disablePrev={page === 1 || loading}
        disableNext={!pageInfo.hasNextPage || loading}
        loading={loading}
      />
    </section>
  );
};

export default Movies;
