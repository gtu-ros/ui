import { useROS } from 'react-ros';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Fab } from '@mui/material';
import { Refresh } from '@mui/icons-material';

// TODO: copy topic on click
const RostopicList = () => {
  const { topics } = useROS();
  const update = useForceUpdate();
  console.log({ topics });
  const columns = [
    { field: 'id', headerName: 'Topic', flex: 3 },
    {
      field: 'msgType',
      headerName: 'Message Type',
      flex: 1
    }
  ];

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <DataGrid
        columns={columns}
        rows={topics.map(({ path, msgType }) => ({ id: path, msgType }))}
        density="compact"
        rowHeight={30}
        hideFooter
        disableSelectionOnClick
      />
      <Fab
        style={{ position: 'absolute', right: 10, bottom: 10 }}
        onClick={update}
        size="small"
        color="secondary"
      >
        <Refresh />
      </Fab>
    </div>
  );
};

export default RostopicList;
