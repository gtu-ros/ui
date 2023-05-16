import {
  Grid,
  Typography,
  Divider,
  ListItem
} from '@mui/material';

const DataGridRowInfo = (props) => {
  return Object.entries(props).map(([key, value]) => (
    <>
      <ListItem>
        <Grid container rowSpacing={1}>
          <Grid item xs={3}>
            <Typography style={{ fontWeight: 700 }}>{key}</Typography>
          </Grid>
          <Grid item xs={9}>
            {value}
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </>
  ));
};

export default DataGridRowInfo;
