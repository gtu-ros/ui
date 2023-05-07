import { Grid } from '@mui/material';
import DataGridRowInfo from './DataGridRowInfo';

const InfoModal = ({ row, image }) =>
  image ? (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <DataGridRowInfo {...row} />
        </Grid>
        <Grid item xs={5}>
          <img
            src={image}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain'
            }}
          />
        </Grid>
      </Grid>
    </div>
  ) : (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DataGridRowInfo {...row} />
        </Grid>
      </Grid>
    </div>
  );

export default InfoModal;
