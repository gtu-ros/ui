import React from 'react';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './style.css';
import './style-ex.css';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class GridLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: props.editable,
      currentBreakpoint: 'lg',
      compactType: 'vertical',
      mounted: false,
      layouts: { lg: props.initialLayout }
    };

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  }

  onLayoutChange(layout, layouts) {
    this.props.onLayoutChange(layout, layouts);
  }

  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          {...this.props}
          isDraggable={this.state.editable}
          draggableCancel={'.cancel-draggable'}
          isResizable={this.state.editable}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          measureBeforeMount={false}
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
          {this.props.children}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

GridLayout.defaultProps = {
  className: 'layout',
  rowHeight: 36,
  onLayoutChange: function() {},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  initialLayout: [],
  editable: false
};
