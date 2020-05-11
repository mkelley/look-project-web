import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Plot from 'react-plotly.js';
import { recentPhot } from '../data';

export default function RecentPhotometryPlot() {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Photometry
      </Typography>
      <Container>
        <Plot
          data={[{
            x: recentPhot.map(row => row.ostat),
            y: recentPhot.map(row => row.estat),
            mode: 'markers',
            type: 'scatter',
            marker: {
              color: '#edc948'
            },
            hovertext: recentPhot.map(row => row.object),
            hoverinfo: "text"
          }]}
          layout={{
            xaxis: {
              title: "outburst statistic"
            },
            yaxis: {
              title: "extendedness statistic"
            },
            autosize: true,
            automargin: true,
            margin: { t: 20 },
            height: 325,
          }}
          useResizeHandler
          style={{ width: '100%', height: '100%' }}
        />
      </Container>
    </React.Fragment>
  );
}
