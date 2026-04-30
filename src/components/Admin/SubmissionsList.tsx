import React from 'react';
import { useAppContext } from '../../context/AppContext';
import SubmissionsToolbar from './SubmissionsToolbar';
import SubmissionsTable from './SubmissionsTable';
import SubmissionsPagination from './SubmissionsPagination';

const SubmissionsList: React.FC = () => {
  const { totalRows } = useAppContext();

  return (
    <section className="admin-section form-card submissions-table-container">
      <div className="admin-section-header">
        <SubmissionsToolbar totalRows={totalRows} />
        <SubmissionsPagination />
      </div>
      <SubmissionsTable />
    </section>
  );
};

export default SubmissionsList;
