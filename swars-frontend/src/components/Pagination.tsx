import React from 'react';

interface PaginationProps {
  page: number;
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ page, onPrev, onNext, disablePrev, disableNext, loading }) => (
  <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <button
      className="pagination-btn"
      disabled={disablePrev || loading}
      onClick={onPrev}
    >
      Anterior
    </button>
    <span style={{ margin: '0 1rem' }}>Página {page}</span>
    <button
      className="pagination-btn"
      disabled={disableNext || loading}
      onClick={onNext}
    >
      Siguiente
    </button>
  </div>
);

export default Pagination;
