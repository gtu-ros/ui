import { Box, Grid, Paper } from '@material-ui/core';
import Frame from '../components/Frame';
import { styled } from '@mui/material/styles';
import Row from '../components/Row';
import GridContainer from '../components/GridContainer';

const TestLayout = () => {
  return (
    <GridContainer>
      <Row height={1}>
        <Frame xs={3} />
        <Frame xs={2} />
        <Frame xs={4} />
      </Row>
      <Row height={3}>
        <Frame xs={4} />
        <Frame xs={4} />
        <Frame xs={4} />
      </Row>
      <Row height={3}>
        <Frame xs={4} />
        <Frame xs={8} />
      </Row>
      <Row height={3}>
        <Frame xs={4} />
        <Frame xs={4} />
        <Frame xs={4} />
      </Row>
    </GridContainer>
  );
};

export default TestLayout;
