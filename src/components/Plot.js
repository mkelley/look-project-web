import React from 'react';

function Plot(props) {
  return <></>;
}

if (typeof document !== `undefined`) {
  // avoid crash during gatsby build
  const plotly = require('react-plotly.js');
  Plot = plotly.default;
}

export default Plot;