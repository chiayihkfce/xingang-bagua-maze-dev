import React from 'react';
import { useAppContext } from '../../context/AppContext';

const SubmissionsPagination: React.FC = () => {
  const {
    totalRows,
    adminFilterDate,
    currentPage,
    isDataLoading,
    loadPage
  } = useAppContext();

  if (adminFilterDate) return null;

  const totalPages = Math.ceil(totalRows / 50);

  return (
    <div className="pagination">
      <button
        onClick={() => loadPage(currentPage - 1)}
        disabled={currentPage === 1 || isDataLoading}
      >
        上一頁
      </button>
      <span className="copy" style={{ color: 'var(--primary-gold)' }}>
        第 {currentPage} 頁 / 共 {totalPages} 頁
      </span>
      <button
        onClick={() => loadPage(currentPage + 1)}
        disabled={currentPage >= totalPages || isDataLoading}
      >
        下一頁
      </button>
    </div>
  );
};

export default SubmissionsPagination;
