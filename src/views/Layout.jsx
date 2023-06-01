import React from 'react';
import Frame from '../components/Frame';

import GridLayout from '../components/Grid';

const Layout = ({ plugins, gridKey = '' }) => {
  const isMobile = "ontouchstart" in document.documentElement;
  return (
    <GridLayout editable={!isMobile}>
      {plugins.map((item) => {
        const {
          plugin: { title, component, fixed },
          layout,
          key
        } = item;
        const Plugin = component;
        return (
          <div
            key={`${key}-${gridKey}`}
            data-grid={{
              ...layout
            }}
          >
            <Frame title={title} fixed={fixed} pluginKey={key}>
              {component && <Plugin />}
            </Frame>
          </div>
        );
      })}
    </GridLayout>
  );
};

export default Layout;
