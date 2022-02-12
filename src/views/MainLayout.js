import React from 'react';
import Frame from '../components/Frame';

import GridLayout from '../components/Grid';
import { Checkbox, FormControlLabel } from '@mui/material';
import { MAIN_LAYOUT } from '../constants/plugins';

// TODO: delete
const todo = (arr) => (
  <div style={{ marginLeft: 10 }}>
    {arr.map((e) => (
      <div>
        <FormControlLabel control={<Checkbox />} label={e} />
      </div>
    ))}
  </div>
);
const MainLayout = () => {
  return (
    <GridLayout editable>
      {MAIN_LAYOUT.map((item) => {
        const {
          plugin: { title, component, fixed },
          layout
        } = item;
        const Plugin = component;
        return (
          <div key={title} data-grid={layout}>
            <Frame title={title} fixed={fixed}>
              {component && <Plugin />}
            </Frame>
          </div>
        );
      })}

      <div key="todo" data-grid={{ x: 0, y: 3, w: 3, h: 8 }}>
        <Frame title="TODO">
          {todo([
            'Consider new window components',
            'Consider dnd to toolbox/sidebar',
            'react-grid: local storage',
            'zoom out: cancel draggable'
          ])}
        </Frame>
      </div>
      <div key="todo2" data-grid={{ x: 3, y: 2, w: 3, h: 8 }}>
        <Frame title="TODO - postponed">
          {todo([
            'Rostopic list',
            'turn on/off fetch ros data',
            'hoc: withRos (data provider)',
            'ros components: online/offline status'
          ])}
        </Frame>
      </div>
    </GridLayout>
  );
};

export default MainLayout;
