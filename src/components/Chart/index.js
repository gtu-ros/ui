import 'moment-duration-format';
import moment from 'moment';
import React, { useState } from 'react';
import _ from 'underscore';
import { format } from 'd3-format';

import { TimeSeries, TimeRange, Index } from 'pondjs';

import {
  ChartContainer,
  ChartRow,
  Charts,
  YAxis,
  LabelAxis,
  LineChart,
  ScatterChart,
  Resizable,
  Legend,
  styler
} from 'react-timeseries-charts';

const Chart = ({ data, label }) => {
  const [tracker, setTracker] = useState();
  const [trackerX, setTrackerX] = useState();

  const handleTrackerChanged = (t, scale) => {
    setTracker(t);
    setTrackerX(scale(t));
  };

  const series = new TimeSeries({
    name: 'name',
    columns: ['time', 'value'],
    points: data
  });

  const timeRange = series.range();
  const currentValue = series?.atLast()?.get('value');
  const currentTime = series?.atLast()?.get('time');
  const style = styler([{ key: 'value', color: 'steelblue', width: 2 }]);
  const valueFormat = format('.2f');
  const summary = [
    { label: 'Current', value: valueFormat(currentValue) },
    { label: 'Max', value: valueFormat(series?.max('value')) },
    { label: 'Avg', value: valueFormat(series?.avg('value')) }
  ];

  let trackerValue = currentValue;
  if (tracker) {
    const index = series.bisect(tracker);
    const trackerEvent = series.at(index);
    trackerValue = trackerEvent.get('value');
  }
  trackerValue = valueFormat(trackerValue);
  const trackerTime = moment(+tracker || currentTime).format('HH:mm:ss');

  return (
    <div>
      {tracker ? (
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: trackerX }}>
            <Legend
              type="line"
              align="right"
              style={style}
              categories={[
                { key: 'value', label: trackerValue, value: trackerTime }
              ]}
            />
          </div>
        </div>
      ) : null}
      {data.length !== 0 && (
        <Resizable>
          <ChartContainer
            timeRange={timeRange}
            trackerPosition={tracker}
            onTrackerChanged={handleTrackerChanged}
          >
            <ChartRow height="200">
              <Charts>
                <ScatterChart axis="y1" series={series} columns={['value']} />
                <LineChart
                  axis="y"
                  series={series}
                  style={style}
                  columns={['value']}
                  breakLine
                />
              </Charts>
              <YAxis
                id="y1"
                min={0}
                max={1}
                type="linear"
                format=",.2f"
                showGrid
              />
              <LabelAxis
                id="y"
                label={label}
                hideScale
                values={summary}
                min={0}
                max={1}
                width={40}
                type="linear"
              />
            </ChartRow>
          </ChartContainer>
        </Resizable>
      )}

      <h2 style={{ paddingRight: 20, float: 'right', marginTop: -80 }}>
        {valueFormat(currentValue)}
      </h2>
    </div>
  );
};

export default Chart;
