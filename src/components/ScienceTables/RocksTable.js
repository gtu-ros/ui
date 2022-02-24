import { DataGrid } from '@mui/x-data-grid';
import { useModal } from 'mui-modal-provider';
import rocksCsv from './rocks.csv';
import LargeModal from '../LargeModal';
import LinkCell from './CellRenderers/LinkCell';
import useCsvTable from '../../hooks/useCsvTable';
import InfoModal from './InfoModal';
import ColorList from './CellRenderers/ColorList';

const RocksTable = () => {
  const { rows } = useCsvTable(rocksCsv);
  const { showModal } = useModal();

  const renderInfo = (params) =>
    showModal(LargeModal, {
      title: params.row['Rock Name'],
      children: <InfoModal row={params.row} />
    });

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 20
    },
    {
      field: 'Rock Name',
      width: 160
    },
    {
      field: 'Rock Types',
      width: 140
    },
    {
      field: 'Chemical Formula',
      width: 200
    },
    {
      field: 'Rock Color',
      width: 200,
      renderCell: (params) => <ColorList array={params.value.split(',')} />
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
      width: 60,
      renderCell: (params) => <LinkCell src={params.value} />
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
