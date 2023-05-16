import { DataGrid } from '@mui/x-data-grid';
import { useModal } from 'mui-modal-provider';
import meteroitsCsv from './meteroits.csv';
import ImageCell from './CellRenderers/ImageCell';
import InfoModal from './InfoModal';
import { LargeModal } from '../Modal';

const MeteroitsTable = () => {
  const { showModal } = useModal();

  const renderInfo = (params) =>
    showModal(LargeModal, {
      title: params.row.Name,
      children: (
        <InfoModal
          row={params.row}
          image={params.row['Representative Image']}
        />
      )
    });

  const columns = [
    {
      field: 'Name',
      width: 150
    },
    {
      field: 'Classfication',
      width: 200
    },
    {
      field: 'Type',
      width: 150
    },
    {
      field: 'About Mineralogy',
      width: 200
    },
    {
      field: 'Representative Image',
      width: 60,
      renderCell: (params) => (
        <ImageCell src={params.value} modalTitle={params.row.Name} />
      )
    },
    {
      field: 'What this meteroit can tell us?',
      width: 900
    }
  ];

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <DataGrid
        rows={meteroitsCsv}
        columns={columns}
        getRowId={row => row['Name']}
        onRowDoubleClick={renderInfo}
        disableSelectionOnClick
        hideFooter
      />
    </div>
  );
};

export default MeteroitsTable;
