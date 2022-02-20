import React from 'react';
import Frame from '../components/Frame';

import GridLayout from '../components/Grid';

const Layout = ({ plugins }) => {
  return (
    <GridLayout editable>
      {plugins.map((item) => {
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

export default Layout;
