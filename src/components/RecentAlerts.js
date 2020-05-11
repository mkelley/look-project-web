import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Plot from './Plot';
import { recentAlerts } from '../data';

export default function RecentAlerts() {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Alerts
      </Typography>
      <Container>
        <Plot
          data={[{
            x: recentAlerts.map(row => row.ostat),
            y: recentAlerts.map(row => row.estat),
            mode: 'markers',
            type: 'scatter',
            marker: {
              color: '#edc948'
            },
            hovertext: recentAlerts.map(row => row.object),
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
