
import React, { useState, useEffect } from 'react';
import InputField from '../../components/InputField';
import { graphqlQuery } from '../../services/graphqlService';
import MOVIE_MUTATION from '../../queries/movieMutation';
import PLANETS_QUERY from '../../queries/planetsQuery';
import './AddMovie.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddMovie: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: '',
    textoDeApertura: '',
    director: '',
    productores: '',
    fechaEstreno: '',
    duracionMinutos: '',
    planetasIds: [],
    personajesIds: []
  });
  const [planetas, setPlanetas] = useState<{id: string, nombre: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchPlanetas = async () => {
      try {
        const response = await graphqlQuery(PLANETS_QUERY);
        const edges = response?.data?.allPlanetas?.edges || [];
        setPlanetas(edges.map((edge: any) => edge.node));
      } catch {
        setPlanetas([]);
      }
    };
    fetchPlanetas();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, selectedOptions } = e.target as HTMLInputElement & HTMLSelectElement;
    if (type === 'select-multiple') {
      setForm({
        ...form,
        [name]: Array.from(selectedOptions, option => option.value)
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const variables = { input: {
        ...form,
        duracionMinutos: parseInt(form.duracionMinutos) || null,
        planetasIds: form.planetasIds,
        personajesIds: form.personajesIds
      }};
      const response = await graphqlQuery(MOVIE_MUTATION, variables);
      if (response.errors) throw new Error(response.errors[0].message);
      toast.success('Película guardada correctamente');
      setForm({
        titulo: '',
        textoDeApertura: '',
        director: '',
        productores: '',
        fechaEstreno: '',
        duracionMinutos: '',
        planetasIds: [],
        personajesIds: []
      });
    } catch (err: any) {
      setError(err.message || 'Error al crear película');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="add-movie-page">
      <div className="table-header-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Agregar Película</h2>
        <button type="button" className="add-movie-btn" onClick={() => navigate('/manage-movies')}>
          Volver
        </button>
      </div>
      <form className="add-movie-form" onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <InputField label="Título" name="titulo" value={form.titulo} onChange={handleChange} required />
        <InputField label="Texto de apertura" name="textoDeApertura" value={form.textoDeApertura} onChange={handleChange} textarea />
        <InputField label="Director" name="director" value={form.director} onChange={handleChange} />
        <InputField label="Productores" name="productores" value={form.productores} onChange={handleChange} />
        <InputField label="Fecha de estreno" name="fechaEstreno" value={form.fechaEstreno} onChange={handleChange} type="date" />
        <InputField label="Duración (minutos)" name="duracionMinutos" value={form.duracionMinutos} onChange={handleChange} type="number" />
        <label>Planetas:</label>
        <select
          name="planetasIds"
          multiple
          value={form.planetasIds}
          onChange={handleChange}
          style={{ minHeight: '2.5rem' }}
        >
          {planetas.map((planeta) => (
            <option key={planeta.id} value={planeta.id}>{planeta.nombre}</option>
          ))}
        </select>
        <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </section>
  );
};

export default AddMovie;
