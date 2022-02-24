import { DataGrid } from '@mui/x-data-grid';
import { useModal } from 'mui-modal-provider';
import fossilsCsv from './fossils.csv';
import LargeModal from '../LargeModal';
import useCsvTable from '../../hooks/useCsvTable';
import ImageCell from './CellRenderers/ImageCell';
import InfoModal from './InfoModal';

const FossilTable = () => {
  const { rows } = useCsvTable(fossilsCsv);
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
      width: 60,
      renderCell: (params) => (
        <ImageCell src={params.value} modalTitle={params.row.Name} />
      )
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
