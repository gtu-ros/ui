import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { parse } from 'papaparse';
import { useModal } from 'mui-modal-provider';
import { IconButton, Grid } from '@mui/material';
import rocksCsv from './rocks.csv';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import LargeModal from '../LargeModal';
import DataGridRowInfo from './DataGridRowInfo';

const RocksTable = () => {
  const [rows, setRows] = useState([]);
  const { showModal } = useModal();

  useEffect(() => {
    fetch(rocksCsv)
      .then((r) => r.text())
      .then((text) => {
        const { data } = parse(text, { header: true });
        const rowsFromCsv = data.map((row, id) => ({ id, ...row }));
        setRows(rowsFromCsv);
      });
  }, []);

  const renderLinkCell = (params) =>
    params.value ? (
      <a target="_blank" href={params.value}>
        <IconButton>
          <PhotoLibraryIcon />
        </IconButton>
      </a>
    ) : (
      <div>-</div>
    );

  const renderInfo = (params) =>
    showModal(LargeModal, {
      title: params.row['Rock Name'],
      children: (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DataGridRowInfo {...params.row} />
            </Grid>
          </Grid>
        </div>
      )
    });

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 20
    },
    {
      field: 'Rock Name',
      width: 200
    },
    {
      field: 'Rock Types',
      width: 100
    },
    {
      field: 'Chemical Formula',
      width: 100
    },
    {
      field: 'Rock Color',
      width: 100
    },
    {
      field: 'Vitreous',
      width: 100
    },
    {
      field: 'Crystal Forms',
      width: 100
    },
    {
      field: 'Cleavage',
      width: 100
    },
    {
      field: 'Representative Photo',
      width: 100,
      renderCell: renderLinkCell
    },
    {
      field: 'What this rock can tell us?',
      width: 900
    }
  ];

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowDoubleClick={renderInfo}
        disableSelectionOnClick
        hideFooter
      />
    </div>
  );
};

export default RocksTable;
