import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { parse } from 'papaparse';
import { useModal } from 'mui-modal-provider';
import { IconButton, Grid } from '@mui/material';
import fossilsCsv from './fossils.csv';
import ImageIcon from '@mui/icons-material/Image';
import LargeModal from '../LargeModal';
import DataGridRowInfo from './DataGridRowInfo';

const FossilTable = () => {
  const [rows, setRows] = useState([]);
  const { showModal } = useModal();

  useEffect(() => {
    fetch(fossilsCsv)
      .then((r) => r.text())
      .then((text) => {
        const { data } = parse(text, { header: true });
        const rowsFromCsv = data.map((row, id) => ({ id, ...row }));
        setRows(rowsFromCsv);
      });
  }, []);

  const renderImageCell = (params) => (
    <IconButton
      onClick={() => {
        showModal(LargeModal, {
          title: params.row.Name,
          children: (
            <img
              src={params.value}
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'contain'
              }}
            />
          )
        });
      }}
    >
      <ImageIcon />
    </IconButton>
  );

  const renderInfo = (params) =>
    showModal(LargeModal, {
      title: params.row.Name,
      children: (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <DataGridRowInfo {...params.row} />
            </Grid>
            <Grid item xs={5}>
              <img
                src={params.row['Representative Image']}
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'contain'
                }}
              />
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
      field: 'Name',
      width: 150
    },
    {
      field: 'Kingdom',
      width: 100
    },
    {
      field: 'Phylum',
      width: 100
    },
    {
      field: 'Clade',
      width: 100
    },
    {
      field: 'Subphylum',
      width: 100
    },
    {
      field: 'Class',
      width: 100
    },
    {
      field: 'Representative Image',
      width: 100,
      renderCell: renderImageCell
    },
    {
      field: 'What this fossil can tell us?',
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

export default FossilTable;
