import { useState, useEffect } from 'react';
import { loadCsv } from '../components/ScienceTables/utils';

const useCsvTable = (file) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadCsv(file).then((rows) => setRows(rows));
  }, []);

  return { rows };
};

export default useCsvTable;
