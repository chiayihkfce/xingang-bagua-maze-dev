import React from 'react';
import { useAppContext } from '../../context/AppContext';

const SubmissionsTable: React.FC = () => {
  const {
    submissions,
    visibleColumns,
    handleSort,
    sortConfig,
    setAuditTarget,
    setShowAuditModal,
    startEditSubmission,
    handleDeleteSubmission,
    formatFullDateTime,
    selectedIds,
    setSelectedIds
  } = useAppContext();

  const toggleSelectAll = () => {
    if (selectedIds.length === submissions.length - 1) {
      setSelectedIds([]);
    } else {
      setSelectedIds(submissions.slice(1).map((row) => row[16]));
    }
  };

  const toggleSelect = (docId: string) => {
    if (selectedIds.includes(docId)) {
      setSelectedIds(selectedIds.filter((id) => id !== docId));
    } else {
      setSelectedIds([...selectedIds, docId]);
    }
  };

  return (
    <table className="submissions-table">
      <thead>
        <tr>
          <th style={{ width: '40px' }}>
            <input
              type="checkbox"
              checked={
                selectedIds.length > 0 &&
                selectedIds.length === submissions.length - 1
              }
              onChange={toggleSelectAll}
              title="全選"
            />
          </th>
          <th>操作</th>
          {submissions[0]?.map(
            (h: any, i: number) =>
              visibleColumns.includes(i) && (
                <th key={i}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {h}
                    <button
                      className={`sort-btn ${sortConfig?.key === i ? 'active' : ''}`}
                      onClick={() => handleSort(i)}
                      title="點擊排序"
                    >
                      {sortConfig?.key === i
                        ? sortConfig.direction === 'asc'
                          ? '▲'
                          : '▼'
                        : '↕'}
                    </button>
                  </div>
                </th>
              )
          )}
        </tr>
      </thead>
      <tbody>
        {submissions.slice(1).map((row, i) => (
          <tr
            key={row[16] || i}
            className={selectedIds.includes(row[16]) ? 'selected-row' : ''}
          >
            <td>
              <input
                type="checkbox"
                checked={selectedIds.includes(row[16])}
                onChange={() => toggleSelect(row[16])}
              />
            </td>
            <td className="action-cell">
              <button
                onClick={() => {
                  setAuditTarget({ index: i + 1, row });
                  setShowAuditModal(true);
                }}
                className="edit-btn"
                style={{ background: '#f39c12', color: 'white' }}
              >
                審核
              </button>
              <button
                onClick={() => startEditSubmission(row, i + 1)}
                className="edit-btn"
              >
                修改
              </button>
              <button
                onClick={() => handleDeleteSubmission(i + 1)}
                className="delete-btn"
              >
                刪除
              </button>
            </td>
            {row.map(
              (cell: any, j: number) =>
                visibleColumns.includes(j) && (
                  <td key={j}>
                    {j === 0 && cell ? (
                      formatFullDateTime(cell)
                    ) : j === 1 ? (
                      <span
                        style={{
                          padding: '0.3rem 0.8rem',
                          borderRadius: '50px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          background:
                            cell === '通過'
                              ? 'rgba(39, 174, 96, 0.2)'
                              : 'rgba(255, 255, 255, 0.1)',
                          color: cell === '通過' ? '#2ecc71' : '#bbb'
                        }}
                      >
                        {cell || '待審核'}
                      </span>
                    ) : j === 15 ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          justifyContent: 'center'
                        }}
                      >
                        <span style={{ fontSize: '0.85rem' }}>{cell}</span>
                        {row[18] === true && (
                          <span
                            title="系統已自動發送證書"
                            style={{
                              background: '#27ae60',
                              color: 'white',
                              fontSize: '10px',
                              padding: '1px 5px',
                              borderRadius: '4px',
                              fontWeight: 'bold'
                            }}
                          >
                            已發證
                          </span>
                        )}
                      </div>
                    ) : (
                      cell
                    )}
                  </td>
                )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubmissionsTable;
