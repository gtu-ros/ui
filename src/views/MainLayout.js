import React from 'react';
import Frame from '../components/Frame';

import GridLayout from '../components/Grid';
import { MAIN_LAYOUT } from '../constants/plugins';

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
    </GridLayout>
  );
};

export default MainLayout;
