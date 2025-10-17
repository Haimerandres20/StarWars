import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { graphqlQuery } from '../../services/graphqlService';
import MOVIES_QUERY from '../../queries/moviesQuery';
import './MoviesTable.css';
import Pagination from '../../components/Pagination';

interface Pelicula {
  id: string;
  idDb?: number;
  titulo: string;
  director: string;
  fechaEstreno: string;
}

const MoviesTable: React.FC = () => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageInfo, setPageInfo] = useState<{ hasNextPage: boolean; endCursor: string | null }>({ hasNextPage: false, endCursor: null });
  const [after, setAfter] = useState<string | null>(null);
  const [pageStack, setPageStack] = useState<string[]>([]); 
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

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

  const handleDelete = (id: string) => {
    // Aquí  la lógica de eliminación por mutation
    setPeliculas(peliculas.filter(p => p.id !== id));
  };

  return (
    <section className="movies-table-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Listado de Películas</h2>
        <Link to="/add-movie">
          <button className="add-movie-btn">Agregar Película</button>
        </Link>
      </div>
      {loading && <div className="loading">Cargando...</div>}
      {error && <div className="error-message">{error}</div>}
      <table className="movies-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Director</th>
            <th>Estreno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {peliculas.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.idDb ?? movie.id}</td>
              <td>{movie.titulo}</td>
              <td>{movie.director}</td>
              <td>{movie.fechaEstreno}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(movie.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default MoviesTable;
